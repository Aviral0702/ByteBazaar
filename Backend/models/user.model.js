import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    isSeller: {
        type: Boolean,
        default: false,
    },
    products: [{
        listingId: {
            type: Schema.Types.ObjectId,
            ref: 'Listing',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        boughtAt: {
            type: Date,
        }
    }],
    cart: [{
        listingId: {
            type: Schema.Types.ObjectId,
            ref: 'Listing',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        }
    }],
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;