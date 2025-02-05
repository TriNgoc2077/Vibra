import { Request, Response, NextFunction } from "express";
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET 
});

let streamUpload = (fileBuffer: Buffer, resourceType: string = "auto"): Promise<any> => {
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

async function upload(req: Request) {
    if (req.file) {
        const result = await streamUpload(req.file.buffer);
        req.body[req.file.fieldname] = result;
    }
}

export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        try {
            await upload(req);
        } catch (error) {
            return res.status(500).json({ error: "File upload failed" });
        }
    }
    next();
};

export const uploadFields = async (req: Request, res: Response, next: NextFunction) => {
    if (req.files && !Array.isArray(req.files)) {
        console.log(req.files);
        for (const key in req.files) {
            req.body[key] = [];
            const filesArray = req.files[key] as Express.Multer.File[];
            for (const file of filesArray) {
                try {
                    const result = await streamUpload(file.buffer);
                    req.body[key].push(result);
                } catch (error) {
                    console.error(`Failed to upload file: ${file.originalname}`, error);
                }
            }
        }
    }
    next();
};
