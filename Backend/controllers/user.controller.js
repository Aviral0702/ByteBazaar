import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

// Test API route
export const test = (req, res) => {
    res.json({
        message: 'API route is working!',
    });
};

// Update user profile
export const updateUser = async(req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only update your own account!'));
    }

    try {
        const updateFields = {};
        if (req.body.username) updateFields.username = req.body.username;
        if (req.body.email) updateFields.email = req.body.email;
        if (req.body.password) {
            updateFields.password = bcryptjs.hashSync(req.body.password, 10);
        }
        if (req.body.avatar) updateFields.avatar = req.body.avatar;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, { $set: updateFields }, { new: true }
        );

        if (!updatedUser) {
            return next(errorHandler(404, 'User not found!'));
        }

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
// Delete user account
export const deleteUser = async(req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only delete your own account!'));
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error);
    }
};

// Get user listings
export const getUserListings = async(req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only view your own listings!'));
    }

    try {
        const listings = await Listing.find({ userRef: req.params.id });
        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};

// Get user profile
export const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(errorHandler(404, 'User not found!'));
        }

        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

// Sign up new user
export const signup = async(req, res, next) => {
    const { name, username, email, password, confirmPassword } = req.body;

    if (!password) {
        return next(errorHandler(400, 'Password must not be empty!'));
    }

    if (password !== confirmPassword) {
        return next(errorHandler(400, 'Passwords do not match!'));
    }

    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ name, username, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json('User created successfully!');
    } catch (error) {
        next(errorHandler(500, 'Error creating user'));
    }
};

// Sign in user
export const signin = async(req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(errorHandler(404, 'Wrong Credentials!'));
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return next(errorHandler(401, 'Wrong credentials!'));
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { password: pass, ...userWithoutPassword } = user._doc;

        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(userWithoutPassword);
    } catch (error) {
        next(errorHandler(500, 'Error signing in'));
    }
};

// Sign in with Google
export const google = async(req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const { password: pass, ...userWithoutPassword } = user._doc;

            res.cookie('access_token', token, { httpOnly: true })
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

            res.cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(userWithoutPassword);
        }
    } catch (error) {
        next(errorHandler(500, 'Error with Google sign-in'));
    }
};

// Sign out user
export const signOut = async(req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(errorHandler(500, 'Error signing out'));
    }
};