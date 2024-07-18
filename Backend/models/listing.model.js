import mongoose from 'mongoose';

const { Schema } = mongoose;

const listingSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: true,
    },
    savings: {
        type: String,
        required: true,
    },
    features: [{
        type: String,
    }],
    website: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    offer: {
        type: Boolean,
        required: true,
    },
    imageUrls: {
        type: Array,
        required: true,
    },
    userRef: {
        type: String,
        required: true,
    },
    cashbackOffer: {
        type: String,
        required: true,
    },
    serviceProviders: [{
        name: { type: String, required: true },
        imageUrls: {
            type: Array,
            required: true
        },
        services: [{ type: String }],
        description: { type: String, required: true },
        link: { type: String, required: true },
    }],
    eligibilityRequirements: [{
        type: String,
    }],
    benefits: [{
        type: String,
    }],
    tags: [{
        type: String,
        required: true,
    }],
    discountTitle: {
        type: String,
        required: true,
    },
    discountDescription: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
        required: true,
        trim: true,
        enum: [
            "Accounting",
            "Business Intelligence (BI)",
            "Collaboration",
            "Communication",
            "Content Management System (CMS)",
            "CRM (Customer Relationship Management)",
            "Customer Support",
            "Cybersecurity",
            "Design",
            "Dev Tools (Development Tools)",
            "eCommerce",
            "Enterprise Resource Planning (ERP)",
            "Finance",
            "HR, Recruiting (Human Resources, Recruiting)",
            "Help Desk / Ticketing",
            "Inventory Management",
            "Legal, Compliance",
            "Marketing",
            "Admin (Administrative Tools)",
            "Partner Management",
            "Photo, Video",
            "Point of Sale (POS)",
            "Productivity",
            "Project Management",
            "Sales, Lead Generation",
            "SCM (Supply Chain Management)",
            "Social Media",
            "Software Testing",
            "Task Management",
            "Time Tracking / Timesheet",
            "Website Builders"
        ],
    },
    version: {
        type: String,
        // required: true,
    },
    platforms: [{
        type: String,
        // required: true,
        enum: ["Web", "iOS", "Android"]
    }],
    // requirements: {
    //     type: String,
    // },
    integrations: [{
        type: String,
        // required: true,
    }],
    legal: {
        termsOfService: {
            type: String,
            //  required: true 
        },
        privacyPolicy: {
            type: String,
            //  required: true 
        }
    },
    availability: {
        status: {
            type: String,
            // required: true
        },
        releaseDate: {
            type: Date,
            // required: true 
        }
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;