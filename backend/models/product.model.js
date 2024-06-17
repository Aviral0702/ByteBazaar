import mongoose, { version } from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    text: { type: String, required: true },
    date: { type: Date, required: true }
  });

const productSchema = new Schema(
    {
        product_id:{
            type:String,
            unique:true,
            required:true
        },
        name:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true,
            trim:true,
        },
        category:{
            type: String,
            required:true,
            trim: true,
            enum :[
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
        tags:{
            type: [String],
            required: true,
        },
        pricing:{
            price: {
                type:String,
                required:true,
            },
            currency:{
                type: String,
                required:true,
            },
            billing_frequency:{
                type: String,
                enum :["Weekly","Monthly","Annually"],
                required:true
            }
        },
        discounts: [{
            discountId: { type: String, required: true },
            description: { type: String, required: true },
            amount: { type: Number, required: true },
            validFrom: { type: Date, required: true },
            validTo: { type: Date, required: true }
        }],
        features: [{
            featureId: { type: String, required: true },
            name: { type: String, required: true },
            description: { type: String, required: true }
        }],
        version:{
            type : String,
            required: true,
        },
        platforms :[{
            type : String,
            required: true,
            enum :["Web", "iOS" , "Android"]
        }],
        requirements: { 
            type: String,
        },
        integrations:[{
            type: String,
            required: true,
        }],
        provider_information : {
            provider_id:{
                type: String,
                required:true,
                trim:true,
            },
            name:{
                type:String,
                required:true,
            },
            contact : {
                type: String,
                required:true,
            }

        },
        userReviews: {
            averageRating: { type: Number, required: true },
            reviews: [reviewSchema]
        },

        legal: {
            termsOfService: { type: String, required: true },
            privacyPolicy: { type: String, required: true }
        },

        media: {
            images: [{ type: String }],
            videos: [{ type: String }]
        },

        availability: {
            status: { type: String, required: true },
            releaseDate: { type: Date, required: true }
        }
    }
)

const Product = mongoose.model("Product",productSchema);

export default Product;