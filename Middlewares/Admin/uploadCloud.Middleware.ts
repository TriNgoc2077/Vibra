import { Request, Response, NextFunction } from "express";
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;
import dotenv from 'dotenv';
dotenv.config();
//cloudinary
(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_KEY, 
        api_secret: process.env.CLOUD_SECRET
    });
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();
//end cloudinary

export const uploadSingle = (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        let streamUpload = (req: Request) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error: unknown, result: unknown) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                    }
                );
    
                streamifier.createReadStream((req as any).file.buffer).pipe(stream);
            });
        };
    
        async function upload(req: Request) {
            let result = await streamUpload(req);
            // console.log(result);
            req.body[(req as any).file.fieldname] = (result as any).secure_url;
                    //name of card img 
            next();

        }
    
        upload(req);
    } else {
        next();
    }
    
}