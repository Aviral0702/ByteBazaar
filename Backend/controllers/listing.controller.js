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

//         // let furnished = req.query.furnished;

//         // if (furnished === undefined || furnished === 'false') {
//         //     furnished = { $in: [false, true] };
//         // }

//         // let parking = req.query.parking;

//         // if (parking === undefined || parking === 'false') {
//         //     parking = { $in: [false, true] };
//         // }

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
//                 // furnished,
//                 // parking,
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
import { errorHandler } from '../utils/error.js';
import mongoose from 'mongoose';
export const createListing = async(req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        console.log('Request Body:', req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async(req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
        }
        if (req.user.id !== listing.userRef) {
            return next(errorHandler(401, 'You can only delete your own listings!'));
        }
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted!');
    } catch (error) {
        next(error);
    }
};

export const updateListing = async(req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
        }
        if (req.user.id !== listing.userRef) {
            return next(errorHandler(401, 'You can only update your own listings!'));
        }
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};
console.log("hey listing");
export const getListing = async(req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
        }
        console.log(listing)
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};
console.log("no listing");
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
//             type = { $in: ['featured', 'communication'] };
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
//         res.status(200).json(listings);
//     } catch (error) {
//         next(error);
//     }
// };
export const getListings = async(req, res, next) => {
    console.log("hello")
    try {
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
        console.log(listings)
        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};

// export const getAllProducts = async(req, res, next) => {
//     try {
//         const products = await Listing.find({});
//         res.status(200).json(products);
//     } catch (error) {
//         next(error);
//     }
// }
// export const getProductByCategory = async(req, res, next) => {
//     try {
//         const category = req.params.category;
//         const products = await Listing.find({ category });
//         if (products.length === 0) {
//             return res.status(404).json({ message: 'No products found in this category!' });
//         }
//         res.status(200).json(products);
//     } catch (error) {
//         next(error);
//     }
// };