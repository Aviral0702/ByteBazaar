import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";


const generateAccessAndRefreshToken = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await User.save({validateBeforeSave: false});
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Error while generating tokens")
        
    }
}

const registerUser = asyncHandler(async (req,res)=>{
    const {fullName,email,password,username} = req.body;

    if(
        [fullName,email,password,username].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }

    const existingUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(existingUser){
        throw new ApiError(400,"User already exists")
    }


    const avatarLocalPath = req.files?.avatar[0]?.path || process.env.DEFAULT_AVATAR;

    const avatar = uploadOnCloudinary(avatarLocalPath);

    if(!avatar){
        throw new ApiError(500,"Error while uploading avatar")
    }


    const user = await User.create({
        fullName,
        avatar: avatar?.url,
        email,
        password,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Error while creating user")
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            createdUser,
            "User registered successfully",
        )
    )
    
})

const loginUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;

    if(!username && !email){
        throw new ApiError(400,"Username or email not found");
    }

    const user = await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(400,"User does not exist")
    }

    const isPassword = user.isPasswordCorrect(password);
    if(!isPassword){
        throw new ApiError(400,"Invalid Password");
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly : true,
        secure : true,
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken , options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            loggedInUser,
            "User Logged In Successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,
        {
            $unset:{
                refreshToken:1,
            }
        },
        {
            new:true,
        }

    )
    const options = {
        httpOnly:true,
        secure:true,
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,{},"User logged out successfully")
    )
})

const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {oldPassword , newPassword} = req.body
    const user = await User.findById(user?._id)
    if(!user){
        throw new ApiError(400,"User not found")
    }

    const isPasswordValid = user.isPasswordCorrect(oldPassword);

    if(!isPasswordValid){
        throw new ApiError(401,"Invalid Password")
    }

    user.password = newPassword;
    await user.save({validateBeforeSave:false});

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Password changed successfully"
        )
    )

})

const getCurrentUser = asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            req.user,
            "User details fetched successfully"
        )
    )
})

const updateAccountDetails = asyncHandler(async(req,res)=>{
    const {fullName,email} = req.body;
    if(!fullName || !email ){
        throw new ApiError(400,"All fields are required")
    }
    const user = User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                fullName,
                email: email
            }
        },
        {new : true},
    ).select("-password")
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "User details updated successfully"
        
        )
    )
})

const userAvatarUpdate = asyncHandler(async(req,res)=>{
    const avatarLocalFilePath = req.file?.path
    if(!avatarLocalFilePath){
        throw new ApiError(400,"Avatar not found")
    }
    const avatarUrl = uploadOnCloudinary(avatarLocalFilePath)

    if(!avatarUrl.url){
        throw new ApiError(400,"Something went wrong while uploading the avatar")
    }
    const user = User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                avatar : avatarUrl.url
            }
        },
        {new:true},
    ).select("-password")
    return res.status(200)
    .json(
        new ApiResponse(200
            ,user,
            "Avatar updated successfully"
        
        )
    )
})


export {
    registerUser,
    loginUser,
    changeCurrentPassword,
    logoutUser,
    getCurrentUser,
    updateAccountDetails,
    userAvatarUpdate
}
