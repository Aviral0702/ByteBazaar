import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings,getAllProducts,getProductByCategory } from '../controllers/listing.controller.js';
import { verifyToken } from '../Middleware/auth.middleware.js';
// import { getAllProducts,getProductByCategory } from '../controllers/product.controller.js';

const router = express.Router();

// router.post('/create', verifyToken, createListing);
router.post('/create', createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
console.log("hello there");
router.get('/get/:id', getListing);
console.log("new consolelog");
router.get('/get', getListings);
router.get("/getallproducts", getAllProducts);
router.get("/:category", getProductByCategory);



export default router;