import Product from '../models/product.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

export const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    return res.status(201).json(
        new ApiResponse(201, product, "Product created successfully")
    );
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, 'Product not found!');
    }

    if (req.user.id !== product.userRef) {
        throw new ApiError(401, 'You can only delete your own products!');
    }

    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json(
        new ApiResponse(200, {}, "Product has been deleted!")
    );
});

export const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new ApiError(404, 'Product not found!');
    }
    if (req.user.id !== product.userRef) {
        throw new ApiError(401, 'You can only update your own products!');
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    return res.status(200).json(
        new ApiResponse(200, updatedProduct, "Product updated successfully")
    );
});

export const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new ApiError(404, 'Product not found!');
    }
    return res.status(200).json(
        new ApiResponse(200, product, "Product retrieved successfully")
    );
});

export const getProductByCategory = asyncHandler(async (req, res) => {
    const category = req.params.category;
    const products = await Product.find({ category });
    if (!products || products.length === 0) {
        throw new ApiError(404, 'No products found in this category!');
    }
    return res.status(200).json(
        new ApiResponse(200, products, "Products retrieved successfully")
    );
});

export const getProducts = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 12;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const products = await Product.find({
            name: { $regex: searchTerm, $options: 'i' },
            category: req.query.category || { $in: ['Software', 'Tools', 'Courses', 'Services', 'Books', 'Other'] },
            dealType: req.query.dealType || { $in: ['Lifetime Deal', 'Yearly Subscription', 'Monthly Subscription'] },
        })
        .sort({
            [sort]: order
        })
        .limit(limit)
        .skip(startIndex);

    return res.status(200).json(
        new ApiResponse(200, products, "Products retrieved successfully")
    );
});

export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    return res.status(200).json(
        new ApiResponse(200, products, "All products retrieved successfully")
    );
});