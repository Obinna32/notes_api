const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const signToken = (id) => 
    jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

const sendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    res.status(statusCode).json({
        status: "success",
        token,
        data: { user}
    });
};

exports.register = async (req, res) => {
    const { name, email, password} = req.body;
    const user = await User.create({ name, email, password });
    sendToken(user, 201, res);
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))){
        throw new AppError("Incorrect email or password", 401)
    }

    sendToken(user, 200, res);
};

exports.getMe = async(req, res) => {
    res.status(200).json({ status: "success", data: { user: req.user}});
};