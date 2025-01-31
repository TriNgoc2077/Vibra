import { Request, Response, NextFunction } from "express";
import validator from 'validator';
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    try {        
        if (!req.body.email || !req.body.password) {
            throw new Error('Email or Password does not exist !');
        }
        if (!validator.isEmail(req.body.email)) {
            throw new Error('Invalid email');
        }
        next();
    } catch(error) {
        req.flash('error', (error as Error).message);
        res.json({
            code: 400,
            message: (error as Error).message
        });
    }
};
export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    try {        
        if (!req.body.email || !req.body.password) {
            throw new Error('Email or Password does not exist !');
        }
        if (!validator.isEmail(req.body.email)) {
            throw new Error('Invalid email');
        }
        if (req.body.password !== req.body.confirmPassword) {
            throw new Error('Password and Conform Password does not match !');
        }
        next();
    } catch(error) {
        req.flash('error', (error as Error).message);
        res.json({
            code: 400,
            message: (error as Error).message
        });
    }
};