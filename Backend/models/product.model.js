import mongoose from 'mongoose';

const { Schema } = mongoose;

const ServiceProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    services: [{ type: String }],
    description: { type: String, required: true },
    link: { type: String, required: true },
});


const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    cashbackOffer: {
        type: String,
        required: true
    },
    description: { type: String, required: true },
    savings: { type: String, required: true },
    eligibilityRequirements: [{ type: String }],
    features: [{ type: String }],
    benefits: [{ type: String }],
    tags: [{ type: String }],
    website: { type: String, required: true },
    serviceProviders: [{ type: ServiceProviderSchema }],
    discountTitle: { type: String, required: true },
    discountDescription: { type: String, required: true },
});

// Create and export Product model based on ProductSchema
const Product = mongoose.model('Product', ProductSchema);

export default Product;