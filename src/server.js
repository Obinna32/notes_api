require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 5000;

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION. Shutting Down...", err);
    process.exit(1);
})

const start = async() => {
    await connectDB;
    const server = app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        
    })

process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION. Shutting Down...", err);
    server.close(() => process.exit(1));
})

};


start();