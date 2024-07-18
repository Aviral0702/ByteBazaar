import {User} from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js'; // Assuming this exists

export const signup = asyncHandler(async (req, res) => {
    const { name, username, email, password, confirmPassword } = req.body;

    if (!password) {
        throw new ApiError(400, 'Password must not be empty');
    }

    if (password !== confirmPassword) {
        throw new ApiError(400, 'Passwords do not match!');
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ name, username, email, password: hashedPassword });

    const savedUser = await newUser.save();
    
    return res.status(201).json(
        new ApiResponse(201, { userId: savedUser._id }, 'User created successfully!')
    );
});

export const signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, 'Wrong credentials');
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
        throw new ApiError(401, 'Wrong credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...userWithoutPassword } = user._doc;

    res.cookie('access_token', token, { httpOnly: true });
    
    return res.status(200).json(
        new ApiResponse(200, userWithoutPassword, 'Signed in successfully')
    );
});

export const signedInUserId = asyncHandler(async (req, res) => {
    let token;
    if (req.cookies.access_token) {
        token = req.cookies.access_token;
    } else if (req.headers.authorization) {
        const authHeaderParts = req.headers.authorization.split(' ');
        if (authHeaderParts.length === 2 && authHeaderParts[0] === 'Bearer') {
            token = authHeaderParts[1];
        } else {
            throw new ApiError(401, 'Authorization header format is incorrect');
        }
    }

    if (!token) {
        throw new ApiError(401, 'Authorization token missing');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    return res.status(200).json(
        new ApiResponse(200, { userId: userId }, 'User ID retrieved successfully')
    );
});

export const google = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { password: pass, ...userWithoutPassword } = user._doc;

        res.cookie('access_token', token, { httpOnly: true });
        return res.status(200).json(
            new ApiResponse(200, userWithoutPassword, 'Signed in with Google successfully')
        );
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

        res.cookie('access_token', token, { httpOnly: true });
        return res.status(200).json(
            new ApiResponse(200, userWithoutPassword, 'New user created and signed in with Google successfully')
        );
    }
});

export const signOut = asyncHandler(async (req, res) => {
    res.clearCookie('access_token');
    return res.status(200).json(
        new ApiResponse(200, {}, 'User has been logged out!')
    );
});