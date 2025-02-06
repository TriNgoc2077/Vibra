import { Request, Response } from "express";
import Topic from "../../models/topic.Model";

//[GET] /admin/topics
export const index = async (req: Request, res: Response) => {
    try {
    const topics = await Topic.find({ deleted: false });

        res.render('admin/pages/topics/index', {
            pageTitle: 'Topics Management',
            topics: topics
        })
    } catch(error) {
        console.log((error as Error).message); 
        res.redirect(req.get("Referrer") || "/");
    }
}