import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    // Check if token exists
    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(403, 'Forbidden'));
        }

        // Token is valid, set req.user
        req.user = user;
        next();
    });
};