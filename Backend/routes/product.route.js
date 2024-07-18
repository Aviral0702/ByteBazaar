import express from 'express';
import {
    createProduct,
    deleteProduct,
    updateProduct,
    getProduct,
    getProducts,
} from '../controllers/product.controller.js';
import { verifyToken } from '../Middleware/auth.middleware.js';

const router = express.Router();

router.post('/create', createProduct);
router.delete('/delete/:id', verifyToken, deleteProduct);
router.post('/update/:id', verifyToken, updateProduct);
router.get('/get/:id', getProduct);
router.get('/get', getProducts);
export default router;