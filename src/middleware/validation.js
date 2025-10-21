const { body, validationResult } = require('express-validator');

const signupValidation = [
    body('name')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 3, max: 30 }).withMessage('Name must be between 3 and 30 characters'),

    body('email')
        .isEmail().withMessage('Must be a valid email'),

    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .matches(/[0-9!@#$%^&*]/).withMessage('Password must include at least one number or symbol'),

    body('dob')
        .isDate().withMessage('Date of birth must be a valid date'),

    body('code')
        .matches(/^[A-Z0-9]+$/).withMessage('Code must contain only uppercase letters and numbers'),

    body('maxStudents')
        .isInt({ gt: 0 }).withMessage('maxStudents must be a positive integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const messages = errors.array().map(err => err.msg).join(', ');
            return res.status(400).json({ success: false, message: messages });
        }
        next();
    }
];

module.exports = { signupValidation };
