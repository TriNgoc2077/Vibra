import { Request, Response, NextFunction } from "express";

export const validateCreate = (req: Request, res: Response, next: NextFunction) => {
    try {        
        console.log(req.body.title);
        console.log(req.body.topicId);
        console.log(req.body.singerId);
        
        if (!req.body.title || !req.body.topicId || !req.body.singerId) {
            throw new Error('Title is empty !');
        }
        next();
    } catch(error) {
        req.flash('error', (error as Error).message);
        res.redirect(req.get("Referrer") || "/");
    }
};