import express from 'express';
import {
    newOrder,
    getSingleOrderDetails,
    myOrders,
    getAllOrders,
    // updateOrder,
    // deleteOrder
} from '../controllers/order.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('//new', verifyToken, newOrder);
router.get('/:id', verifyToken, getSingleOrderDetails);
router.get('/me', verifyToken, myOrders);
router.get('/orders', verifyToken, authorizeRoles("admin"), getAllOrders);
// router.put('/admin/order/:id', verifyToken, authorizeRoles("admin"), updateOrder).delete(verifyToken, authorizeRoles("admin"), deleteOrder);

export default router;