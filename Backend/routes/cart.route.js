import express from 'express';
import { addToCart, addToFavorites, getCart, removeFromCart, removeFromFavorites, deleteCartItem, buyCart, buyProduct, getPurchasedProducts } from '../controllers/cart.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/add-to-cart', verifyToken, addToCart);
router.post('/add-to-favorites', verifyToken, addToFavorites);
router.post('/remove-from-cart', verifyToken, removeFromCart);
router.post('/remove-from-favorites', verifyToken, removeFromFavorites);
router.get('/getcart/:userId', verifyToken, getCart)
router.post('/delete', verifyToken, deleteCartItem)
router.post('/buyProduct', verifyToken, buyProduct);
router.post('/buyCart', verifyToken, buyCart);
router.get('/getPurchasedProducts/:userId', verifyToken, getPurchasedProducts);


export default router;