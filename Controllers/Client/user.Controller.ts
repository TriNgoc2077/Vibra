import { Request, Response } from "express";
//[GET] /user/login
export const login = async (req: Request, res: Response) => {
    res.render('client/Pages/User/login', {
        pageTitle: 'Login' 
    });
};
//[POST] /user/login
export const loginPost = async (req: Request, res: Response) => {
    
};