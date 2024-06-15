import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    // console.log(result);
    // console.log("Yahaan tak aake aage nhi jaa paaya");
    // File uploaded successfully
    // console.log("File uploaded successfully", result.url);
    // Remove the file from the local storage
    if(fs.existsSync(localFilePath)){
        fs.unlinkSync(localFilePath);
    }
    return result;
  } catch (err) {
    console.error("Error during Cloudinary upload:", err);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Remove the file if the upload failed
    }
    return null;
  }
};

export { uploadOnCloudinary };
