import { Request, Response, NextFunction } from "express";
import { streamUpload, uploadToCloudinary } from "../../Helpers/uploadToCloudinary";

export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        try {
            await uploadToCloudinary(req);
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
