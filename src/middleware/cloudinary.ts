import { v2 as cloudinary } from "cloudinary";
require("dotenv").config({ path: __dirname + "/../.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadVideoToCLD = async (file: any) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "YoutubeClone/video",
      resource_type: "video",
      use_filename: true,
      unique_filename: true,
    });
    return {
      path: result.url,
      duration: result.duration,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error(error);
  }
};

export const uploadImageToCLD = async (file: any) => {
  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(file, {
      folder: "YoutubeClone/profileImage",
      resource_type: "image",
      use_filename: true,
      unique_filename: true,
    });
    return {
      path: result.url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error(error);
  }
};
