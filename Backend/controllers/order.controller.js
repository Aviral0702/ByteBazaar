// // Import necessary modules
// import { errorHandler } from '../utils/error.js';
// import Order from '../models/order.model.js';
// import Listing from '../models/listing.model.js';

// // Create New Order
// export const newOrder = errorHandler(async(req, res, next) => {
//     const {
//         shippingInfo,
//         orderItems,
//         paymentInfo,
//         totalPrice,
//     } = req.body;

//     const orderExist = await Order.findOne({ paymentInfo });

//     if (orderExist) {
//         return next(new errorHandler("Order Already Placed", 400));
//     }

//     const order = await Order.create({
//         shippingInfo,
//         orderItems,
//         paymentInfo,
//         totalPrice,
//         paidAt: Date.now(),
//         user: req.user._id,
//     });

//     res.status(201).json({
//         success: true,
//         order,
//     });
// });

// // Get Single Order Details
// export const getSingleOrderDetails = errorHandler(async(req, res, next) => {
//     const order = await Order.findById(req.params.id).populate("user", "name email");

//     if (!order) {
//         return next(new errorHandler("Order Not Found", 404));
//     }

//     res.status(200).json({
//         success: true,
//         order,
//     });
// });

// // Get Logged In User Orders
// export const myOrders = errorHandler(async(req, res, next) => {
//     const orders = await Order.find({ user: req.user._id });

//     if (!orders || orders.length === 0) {
//         return next(new errorHandler("Order Not Found", 404));
//     }

//     res.status(200).json({
//         success: true,
//         orders,
//     });
// });

// // Get All Orders ---ADMIN
// export const getAllOrders = errorHandler(async(req, res, next) => {
//     const orders = await Order.find();

//     if (!orders || orders.length === 0) {
//         return next(new errorHandler("Order Not Found", 404));
//     }

//     let totalAmount = 0;
//     orders.forEach((order) => {
//         totalAmount += order.totalPrice;
//     });

//     res.status(200).json({
//         success: true,
//         orders,
//         totalAmount,
//     });
// });

// // Update Order Status ---ADMIN
// export const updateOrder = errorHandler(async(req, res, next) => {
//     const order = await Order.findById(req.params.id);

//     if (!order) {
//         return next(new errorHandler("Order Not Found", 404));
//     }

//     if (order.orderStatus === "Delivered") {
//         return next(new errorHandler("Already Delivered", 400));
//     }

//     if (req.body.status === "Shipped") {
//         order.shippedAt = Date.now();
//         for (let i = 0; i < order.orderItems.length; i++) {
//             await updateStock(order.orderItems[i].product, order.orderItems[i].quantity);
//         }
//     }

//     order.orderStatus = req.body.status;
//     if (req.body.status === "Delivered") {
//         order.deliveredAt = Date.now();
//     }

//     await order.save({ validateBeforeSave: false });

//     res.status(200).json({
//         success: true,
//     });
// });

// async function updateStock(id, quantity) {
//     const product = await Listing.findById(id);
//     if (product) {
//         product.stock -= quantity;
//         await product.save({ validateBeforeSave: false });
//     }
// }

// // Delete Order ---ADMIN
// export const deleteOrder = errorHandler(async(req, res, next) => {
//     const order = await Order.findById(req.params.id);

//     if (!order) {
//         return next(new errorHandler("Order Not Found", 404));
//     }

//     await order.remove();

//     res.status(200).json({
//         success: true,
//     });
// });