import {User} from '../models/user.model.js';
import Listing from '../models/listing.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

export const addToCart = asyncHandler(async (req, res) => {
    const { listingId, userId, quantity } = req.body;
    const listing = await Listing.findById(listingId);
    if (!listing) {
        throw new ApiError(404, 'Listing not found');
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const cartItemIndex = user.cart.findIndex(item => item.listingId.equals(listingId));

    if (cartItemIndex !== -1) {
        user.cart[cartItemIndex].quantity += 1;
    } else {
        user.cart.push({ listingId: listingId, quantity: quantity });
    }

    await user.save();

    return res.status(200).json(
        new ApiResponse(200, {}, "Added to cart")
    );
});

export const removeFromCart = asyncHandler(async (req, res) => {
    const { listingId, userId, quantity } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const cartItemIndex = user.cart.findIndex(item => item.listingId.equals(listingId));

    if (cartItemIndex !== -1) {
        user.cart[cartItemIndex].quantity -= 1;
        if (user.cart[cartItemIndex].quantity <= 0) {
            user.cart.splice(cartItemIndex, 1);
        }
    }

    await user.save();

    return res.status(200).json(
        new ApiResponse(200, {}, "Removed from cart")
    );
});

export const addToFavorites = asyncHandler(async (req, res) => {
    const { listingId, userId } = req.body;

    const listing = await Listing.findById(listingId);
    if (!listing) {
        throw new ApiError(404, 'Listing not found');
    }

    const user = await User.findByIdAndUpdate(
        userId, 
        { $addToSet: { favorites: listingId } }, 
        { new: true }
    ).populate('favorites');

    return res.status(200).json(
        new ApiResponse(200, user.favorites, "Added to favorites")
    );
});

export const removeFromFavorites = asyncHandler(async (req, res) => {
    const { listingId, userId } = req.body;

    const user = await User.findByIdAndUpdate(
        userId, 
        { $pull: { favorites: listingId } }, 
        { new: true }
    ).populate('favorites');

    return res.status(200).json(
        new ApiResponse(200, user.favorites, "Removed from favorites")
    );
});

export const getCart = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate({
        path: 'cart.listingId',
        select: 'name discountPrice imageUrls',
    });

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const cartItems = user.cart
        .filter(item => item.listingId)
        .map(item => ({
            listingId: item.listingId._id,
            name: item.listingId.name,
            quantity: item.quantity,
            discountPrice: item.listingId.discountPrice,
            imageUrls: item.listingId.imageUrls,
        }));

    return res.status(200).json(
        new ApiResponse(200, cartItems, "Cart items retrieved successfully")
    );
});

export const deleteCartItem = asyncHandler(async (req, res) => {
    const { listingId, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    user.cart = user.cart.filter(item => !item.listingId.equals(listingId));
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, {}, "Listing removed from cart")
    );
});

export const buyProduct = asyncHandler(async (req, res) => {
    const { listingId, userId, quantity } = req.body;
    const listing = await Listing.findById(listingId);
    if (!listing) {
        throw new ApiError(404, 'Listing not found');
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const productIndex = user.products.findIndex(item => item.listingId.equals(listingId));

    if (productIndex !== -1) {
        user.products[productIndex].quantity += quantity;
        user.products[productIndex].boughtAt = new Date();
    } else {
        user.products.push({ listingId: listingId, quantity: quantity, boughtAt: new Date() });
    }

    user.cart = user.cart.filter(item => !item.listingId.equals(listingId));
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, {}, "Product purchased successfully")
    );
});

export const buyCart = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const user = await User.findById(userId).populate('cart.listingId');
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    for (let item of user.cart) {
        const listingId = item.listingId._id;
        const quantity = item.quantity;

        const listing = await Listing.findById(listingId);
        if (!listing) {
            throw new ApiError(404, `Listing with ID ${listingId} not found`);
        }

        const productIndex = user.products.findIndex(prod => prod.listingId.equals(listingId));

        if (productIndex !== -1) {
            user.products[productIndex].quantity += quantity;
            user.products[productIndex].boughtAt = new Date();
        } else {
            user.products.push({ listingId: listingId, quantity: quantity, boughtAt: new Date() });
        }
    }

    user.cart = [];
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, {}, "Cart purchased successfully")
    );
});

export const getPurchasedProducts = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate({
        path: 'products.listingId',
        select: 'name discountPrice imageUrls',
    });

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const purchasedProducts = user.products.map(item => ({
        listingId: item.listingId._id,
        name: item.listingId.name,
        quantity: item.quantity,
        discountPrice: item.listingId.discountPrice,
        imageUrls: item.listingId.imageUrls,
        boughtAt: item.boughtAt,
    }));

    return res.status(200).json(
        new ApiResponse(200, purchasedProducts, "Purchased products retrieved successfully")
    );
});