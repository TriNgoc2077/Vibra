import { Request, Response } from "express";

//[GET] /admin/dashboard
export const index = async (req: Request, res: Response) => {
    try {
        res.render('admin/pages/dashboard/index', {
            pageTitle: 'Dashboard'
        });
    } catch(error) {
        console.log((error as Error).message); 
        res.redirect(req.get("Referrer") || "/");
    }
}