import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import productRouter from './routes/product.route.js';
import marketPlaceRouter from './routes/marketplace.route.js'
import cartRouter from './routes/cart.route.js'
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
// app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log('Query Params:', req.query);
    console.log('Body:', req.body);
    next();
});

app.listen(8000, () => {
    console.log('Server is running on port 8000!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/marketplace',marketPlaceRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.log(res);
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});