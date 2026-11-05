const { body, validationResult } = require("express-validator")
const AppError = require("../utils/AppError");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) return next();
    const message = errors.array().map((e) => e.msg).join(". ");
    next (new AppError(message, 400));
};

const registerRules = [
    body("name")
    .isString().withMessage("Name must be text").bail()
    .trim()
    .isLength({ min: 2, max: 100}).withMessage("Name must be 2-100 characters"),
    body("email")
        .isString().withMessage("Email must be text").bail()
        .trim().toLowerCase()
        .isEmail().withMessage("Please provide a valid email"),
    body("password")
        .isString().withMessage("Password must be text").bail()
        .isLength({ min: 8, max: 72})
        .withMessage("Password must be 8-72 characters"),
];

const loginRules = [
    body("email")
        .isString().withMessage("Email must be text").bail()
        .trim().toLowerCase()
        .isEmail().withMessage("Please provide a valid email"),
    body("password")
        .isString().withMessage("Password must be text").bail()
        .notEmpty().withMessage("Password is required"),
];

const noteFieldRules = [
    body("content")
        .optional()
        .isString().withMessage("Content must be text").bail()
        .isLength({ max: 50000}).withMessage("Content cannot exceed 50000 characters"),
    body("tags")
        .optional()
        .isArray({ max: 10}).withMessage("Tags must be an array of at most 10 items"),
    body("tags.*")
        .isString().withMessage("Each tag must be text").bail()
        .trim().toLowerCase()
        .isLength({ min: 1, max: 30}).withMessage("Each tag must be 1-30 characters"),
    body("isPinned")
        .optional()
        .isBoolean().withMessage("isPinned must be true or false"),
];


const createNoteRules = [
    body("title")
        .isString().withMessage("Title must be text").bail()
        .trim()
        .isLength({ min: 1, max: 100}).withMessage("Title must be 1-100 characters"),
    ...noteFieldRules,
];

const updateNoteRules = [
    body("title")
        .optional()
        .isString().withMessage("Title must be text").bail()
        .trim()
        .isLength({min: 1, max: 100}).withMessage("Title must be 1-100 characters"),
    ...noteFieldRules
];

module.exports = { validate, registerRules, loginRules, createNoteRules, updateNoteRules};