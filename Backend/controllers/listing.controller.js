// import Listing from '../models/listing.model.js';
// import { errorHandler } from '../utils/error.js';

// export const createListing = async(req, res, next) => {
//     try {
//         const listing = await Listing.create(req.body);
//         return res.status(201).json(listing);
//     } catch (error) {
//         next(error);
//     }
// };

// export const deleteListing = async(req, res, next) => {
//     const listing = await Listing.findById(req.params.id);

//     if (!listing) {
//         return next(errorHandler(404, 'Listing not found!'));
//     }

//     if (req.user.id !== listing.userRef) {
//         return next(errorHandler(401, 'You can only delete your own listings!'));
//     }

//     try {
//         await Listing.findByIdAndDelete(req.params.id);
//         res.status(200).json('Listing has been deleted!');
//     } catch (error) {
//         next(error);
//     }
// };

// export const updateListing = async(req, res, next) => {
//     const listing = await Listing.findById(req.params.id);
//     if (!listing) {
//         return next(errorHandler(404, 'Listing not found!'));
//     }
//     if (req.user.id !== listing.userRef) {
//         return next(errorHandler(401, 'You can only update your own listings!'));
//     }

//     try {
//         const updatedListing = await Listing.findByIdAndUpdate(
//             req.params.id,
//             req.body, { new: true }
//         );
//         res.status(200).json(updatedListing);
//     } catch (error) {
//         next(error);
//     }
// };

// export const getListing = async(req, res, next) => {
//     try {
//         const listing = await Listing.findById(req.params.id);
//         if (!listing) {
//             return next(errorHandler(404, 'Listing not found!'));
//         }
//         res.status(200).json(listing);
//     } catch (error) {
//         next(error);
//     }
// };

// export const getListings = async(req, res, next) => {
//     try {
//         const limit = parseInt(req.query.limit) || 9;
//         const startIndex = parseInt(req.query.startIndex) || 0;
//         let offer = req.query.offer;

//         if (offer === undefined || offer === 'false') {
//             offer = { $in: [false, true] };
//         }

//         let type = req.query.type;

//         if (type === undefined || type === 'all') {
//             type = { $in: ['sale', 'rent'] };
//         }

//         const searchTerm = req.query.searchTerm || '';

//         const sort = req.query.sort || 'createdAt';

//         const order = req.query.order || 'desc';

//         const listings = await Listing.find({
//                 name: { $regex: searchTerm, $options: 'i' },
//                 offer,
//                 type,
//             })
//             .sort({
//                 [sort]: order
//             })
//             .limit(limit)
//             .skip(startIndex);
//         console.log(listings);
//         return res.status(200).json(listings);
//     } catch (error) {
//         next(error);
//     }
// };

import Listing from '../models/listing.model.js';
import mongoose from 'mongoose';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import User from '../models/user.model.js';
export const createListing = asyncHandler(async(req, res) => {
    const listing = await Listing.create(req.body);
    console.log('Request Body:', req.body);
    return res.status(201).json(
        new ApiResponse(201, listing, "Listing created successfully")
    );
});

export const deleteListing = asyncHandler(async(req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw new ApiError(404, 'Listing not found!');
    }
    if (req.user.id !== listing.userRef) {
        throw new ApiError(401, 'You can only delete your own listings!');
    }
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json(
        new ApiResponse(200, {}, "Listing has been deleted!")
    );
});

export const updateListing = asyncHandler(async(req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw new ApiError(404, 'Listing not found!');
    }
    if (req.user.id !== listing.userRef) {
        throw new ApiError(401, 'You can only update your own listings!');
    }
    const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body, { new: true }
    );
    return res.status(200).json(
        new ApiResponse(200, updatedListing, "Listing updated successfully")
    );
});

console.log("hey listing");

export const getListing = asyncHandler(async(req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw new ApiError(404, 'Listing not found!');
    }
    console.log(listing);
    return res.status(200).json(
        new ApiResponse(200, listing, "Listing retrieved successfully")
    );
});

console.log("no listing");

export const getListings = asyncHandler(async(req, res) => {
    console.log("hello");
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] };
    } else {
        offer = offer === 'true';
    }

    let type = req.query.type;
    if (type === undefined || type === 'all') {
        type = { $in: ['featured', 'communication'] };
    }

    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const searchCriteria = {
        offer,
        type,
        $or: [
            { "name": { $regex: searchTerm, $options: 'i' } },
            { "description": { $regex: searchTerm, $options: 'i' } },
            { "savings": { $regex: searchTerm, $options: 'i' } },
            { "website": { $regex: searchTerm, $options: 'i' } },
            { "cashbackOffer": { $regex: searchTerm, $options: 'i' } },
            { 'serviceProviders.name': { $regex: searchTerm, $options: 'i' } },
            { 'serviceProviders.description': { $regex: searchTerm, $options: 'i' } },
            { 'serviceProviders.services': { $regex: searchTerm, $options: 'i' } },
            { 'serviceProviders.link': { $regex: searchTerm, $options: 'i' } },
            { "eligibilityRequirements": { $regex: searchTerm, $options: 'i' } },
            { "benefits": { $regex: searchTerm, $options: 'i' } },
            { "tags": { $regex: searchTerm, $options: 'i' } },
            { "discountTitle": { $regex: searchTerm, $options: 'i' } },
            { "discountDescription": { $regex: searchTerm, $options: 'i' } }
        ]
    };

    const listings = await Listing.find(searchCriteria)
        .sort({
            [sort]: order
        })
        .limit(limit)
        .skip(startIndex);
    console.log(listings);
    return res.status(200).json(
        new ApiResponse(200, listings, "Listings retrieved successfully")
    );
});

export const getAllProducts = async(req, res, next) => {
    try {
        const products = await Listing.find({});
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}
export const getProductByCategory = async(req, res, next) => {
    try {
        const category = req.params.category;
        const products = await Listing.find({ category });
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found in this category!' });
        }
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};
export const addComment = asyncHandler(async(req, res) => {
    const { listingId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    const listing = await Listing.findById(listingId);

    if (!listing) {
        throw new ApiError(404, 'Listing not found!');
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, 'User not found!');
    }

    const newComment = {
        user: userId,
        name: user.name,
        rating,
        comment
    };

    listing.reviews.push(newComment);

    // Recalculate ratings and number of reviews
    listing.numOfReviews = listing.reviews.length;
    listing.ratings = listing.reviews.reduce((acc, item) => item.rating + acc, 0) / listing.reviews.length;

    await listing.save();

    return res.status(200).json(
        new ApiResponse(200, listing, "Comment added successfully")
    );
});

// Delete comment from a listing
export const deleteComment = asyncHandler(async(req, res) => {
    const { listingId, commentId } = req.params;
    const userId = req.user.id;

    const listing = await Listing.findById(listingId);

    if (!listing) {
        throw new ApiError(404, 'Listing not found!');
    }

    const comment = listing.reviews.id(commentId);

    if (!comment) {
        throw new ApiError(404, 'Comment not found!');
    }

    if (comment.user.toString() !== userId) {
        throw new ApiError(401, 'You can only delete your own comments!');
    }

    comment.remove();

    // Recalculate ratings and number of reviews
    listing.numOfReviews = listing.reviews.length;
    listing.ratings = listing.reviews.reduce((acc, item) => item.rating + acc, 0) / listing.reviews.length;

    await listing.save();

    return res.status(200).json(
        new ApiResponse(200, listing, "Comment deleted successfully")
    );
});