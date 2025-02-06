import { Request, Response } from 'express';
import Topic from '../../models/topic.Model';

//[GET] /topics/
export const topics = async (req: Request, res: Response) => {
    const topics = await Topic.find({ deleted: false });
    res.render('client/pages/topics/index', { 
        pageTitle: 'Song topics',
        topics: topics 
    }); 
}
