const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { rateLimit } = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const AppError = require("./utils/AppError");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json({ limit: "10kb"}));

app.get("/api/v1/health", (req,res) => {
    res.status(200).json({ status: "success", message: "API is running"});
});

const authLimiter = rateLimit({
    windowMs: 15*60*1000,
    limit: 100,
    message: { status: "fail", message: "Too many requests. Try again later"}
});

app.use("/api/v1/auth", authLimiter, authRoutes);
app.use("/api/v1/notes", noteRoutes);

app.use((req, res, next) => {
    next(new AppError(`Cannot find ${req.method} ${req.originalUrl}`, 404));
});

app.use(errorHandler);

module.exports = app;