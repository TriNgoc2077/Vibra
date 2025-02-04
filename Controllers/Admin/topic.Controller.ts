import { Request, Response } from "express";
import Topic from "../../Models/topic.Model";

//[GET] /admin/topics
export const index = async (req: Request, res: Response) => {
    const topics = await Topic.find({ deleted: false });

    res.render('Admin/Pages/Topics/index', {
        pageTitle: 'Topics Management',
        topics: topics
    })
}