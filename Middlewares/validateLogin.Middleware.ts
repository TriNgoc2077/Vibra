import { Request, Response, NextFunction } from "express";
import validator from 'validator';
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    try {        
        if (!validator.isEmail(req.body.email)) {
            throw new Error('Invalid email');
        }
        next();
    } catch(error) {
        res.json({
            code: 400,
            message: (error as Error).message
        });
    }
};