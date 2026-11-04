const AppError = require("../utils/AppError");

const handleCastError = (err) => 
    new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateKey = (err) => {
    const field = Object.keys(err.keyValue)[0];
    return new AppError(`{field} already exists`, 409);
};

const handleValidationError = (err) => {
    const messages = Object.values(err.errors).map((e) => e.message);
    return new AppError(messages.join(". "), 400);
};


module.exports = (err, req, res, next) => {
    let error = err;

    if (err.name === 'CastError') error = handleCastError(err);
    else if (err.code === 11000) error = handleDuplicateKey(err);
    else if (err.name === "ValidationError") error = handleValidationError(err);
    else if (err.name === "JsonWebTokenError")
        error = new AppError("Invalid token. Please log in again.", 401);
    else if (err.name === "TokenExpiredError")
        error = new AppError("Your token has expired. Please log in aagain.", 401);
    else if (err.type === "entity.parse.failed")
        error = new AppError("Invalid JSON in request body", 400);

    const statusCode = error.statusCode || 500;

    if (!error.isOperational){
        console.error("UNEXPECTED ERROR:", err);
    }

    res.status(statusCode).json({
        status: err.status || "error",
        message: error.isOperational ? error.message : "Something went wrong",
        ...AppError(process.env.NODE_ENV === "development" && {stack: err.stack})
    });
};