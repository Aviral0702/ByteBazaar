import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyToken = asyncHandler(async(req, _,next)=>{
    const token = req.cookies.access_token;
    if (!token) {
        throw new ApiError(401,"Unauthorized user")
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            throw new ApiError(403,"Forbidden")
        }

        req.user = user;
        next();
    });
})
