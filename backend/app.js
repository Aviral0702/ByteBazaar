import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(express.json()); //it is used to load json files on the express server
app.use(express.urlencoded({extended:true})); // sometimes we get some names in the url we write this for express to expect an extended amount of the url 
app.use(express.static("public")); //This line of code is used to keep static files like css in the express server
app.use(cookieParser()); //it is the cookie parser saves cookie of user with which server can perform CRUD operations
export {app};