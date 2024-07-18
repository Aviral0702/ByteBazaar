import Product from '../models/product.model.js';
import { errorHandler } from '../utils/error.js';

export const createProduct = async(req, res, next) => {
    try {
        const product = await Product.create(req.body);
        return res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(errorHandler(404, 'Product not found!'));
    }

    if (req.user.id !== product.userRef) {
        return next(errorHandler(401, 'You can only delete your own products!'));
    }

    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('Product has been deleted!');
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(errorHandler(404, 'Product not found!'));
    }
    if (req.user.id !== product.userRef) {
        return next(errorHandler(401, 'You can only update your own products!'));
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

export const getProduct = async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(errorHandler(404, 'Product not found!'));
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const getProductByCategory = async(req, res, next) => {
    try {
        const category = req.params.category
        const product = await Product.find({
            category
        });
        if (!product) {
            return next(errorHandler(404, 'Product not found!'));
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const getProducts = async(req, res, next) => {
    try {
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

        return res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};
export const getAllProducts = async (req,res,next) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}