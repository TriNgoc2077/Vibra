import { Request, Response } from 'express';
import Topic from '../../Models/topic.Model';

//[GET] /topics/
export const topics = async (req: Request, res: Response) => {
    const topics = await Topic.find({ deleted: false });
    res.render('Client/Pages/Topics/index', { 
        pageTitle: 'Song topics',
        topics: topics 
    }); 
}
