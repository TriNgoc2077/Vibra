import { Request, Response } from "express";
//[GET] /favorite-songs/
export const index = async (req: Request, res: Response) => {
    res.render('client/Pages/Favorite-songs/index', {
       pageTitle: 'Favorite Song' 
    });
};