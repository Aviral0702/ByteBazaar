import { Router } from "express";
import { getAllProducts, getProductByCategory } from "../../../Backend/controllers/product.controller.js";
 
const router = Router();


router.get("/",getAllProducts);
router.get("/:category",getProductByCategory);

export default router;