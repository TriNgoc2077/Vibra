import { Request } from "express";
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET 
});

export let streamUpload = (fileBuffer: Buffer, resourceType: string = "auto"): Promise<any> => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            { resource_type: resourceType }, 
            (error: any, result: any) => {
                if (result) {
                    resolve(result.secure_url);
                } else {
                    reject(error);
                }
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};

export async function uploadToCloudinary(req: Request) {
    if (req.file) {
        const result = await streamUpload(req.file.buffer);
        req.body[req.file.fieldname] = result;
    }
}