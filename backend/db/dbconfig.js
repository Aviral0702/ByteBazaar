import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
        console.log("Database connected successfully");
    } catch (error) {
        console.log("MongoDB connnection failed ",error);
        process.exit(1);
    }
    
}
export default connectDB;  //exporting the function to be used in other files.  //