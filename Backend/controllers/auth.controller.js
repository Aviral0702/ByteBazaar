import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';
import { response } from 'express';

export const signup = async(req, res, next) => {
    const { name, username, email, password, confirmPassword } = req.body;

    if (!password) {
        return next(errorHandler(400, 'Password must not be empty!'));
    }

    if (password !== confirmPassword) {
        return next(errorHandler(400, 'Passwords do not match!'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ name, username, email, password: hashedPassword });

    try {
        const savedUser = await newUser.save(); // Save the user and get the saved document
        res.status(201).json({ message: 'User created successfully!', userId: savedUser._id });
    } catch (error) {
        next(errorHandler(500, 'Error creating user'));
    }
};

export const signin = async(req, res, next) => {
    const { email, password } = req.body;
    let userId;

    try {
        const user = await User.findOne({ email });
        if (!user) return next(errorHandler(404, 'Wrong Credentials!'));

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
        userId = user._id;

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...userWithoutPassword } = user._doc;

        res.cookie('access_token', token)
            .status(200)
            .json(userWithoutPassword);
        return userWithoutPassword;
    } catch (error) {
        next(errorHandler(500, 'Error signing in'));
    }
};
export const signedInUserId = async(req, res, next) => {
    try {
        // Get token from cookies or headers
        let token;
        if (req.cookies.access_token) {
            token = req.cookies.access_token;
        } else if (req.headers.authorization) {
            // Split authorization header and get token
            const authHeaderParts = req.headers.authorization.split(' ');
            if (authHeaderParts.length === 2 && authHeaderParts[0] === 'Bearer') {
                token = authHeaderParts[1];
            } else {
                return next(errorHandler(401, 'Authorization header format is incorrect'));
            }
        }

        if (!token) {
            return next(errorHandler(401, 'Authorization token missing'));
        }

        // Verify token and extract user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Fetch user details using user ID
        const user = await User.findById(userId);
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }

        // Respond with user ID
        res.status(200).json({ userId: userId });
    } catch (error) {
        console.error('Error getting signed-in user ID:', error);
        next(errorHandler(500, 'Error getting signed-in user ID'));
    }
};
export const google = async(req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const { password: pass, ...userWithoutPassword } = user._doc;

            res.cookie('access_token', token)
                .status(200)
                .json(userWithoutPassword);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({
                username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });

            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const { password: pass, ...userWithoutPassword } = newUser._doc;

            res.cookie('access_token', token)
                .status(200)
                .json(userWithoutPassword);
        }
    } catch (error) {
        next(errorHandler(500, 'Error with Google sign-in'));
    }
};

export const signOut = async(req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(errorHandler(500, 'Error signing out'));
    }
};