export function setUser(req, res, next) {
    res.locals.user = req.user || null; // Assuming req.user is set after authentication
    next();
} 