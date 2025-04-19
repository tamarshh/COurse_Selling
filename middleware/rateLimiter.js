import rateLimit from 'express-rate-limit';

// General API rate limiter
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

// Auth rate limiter (more strict)
export const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many auth attempts from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

// Purchase rate limiter
export const purchaseLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 purchase requests per windowMs
    message: 'Too many purchase attempts from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
}); 