import { body, param, validationResult } from 'express-validator';

export const validateSignup = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required')
];

export const validateLogin = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];

export const validateCourse = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('imageUrl').optional().isURL().withMessage('Image URL must be a valid URL')
];

export const validateCourseId = [
    param('courseId').isMongoId().withMessage('Invalid course ID')
];

export const validatePurchase = [
    body('courseId').isMongoId().withMessage('Invalid course ID')
];

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}; 