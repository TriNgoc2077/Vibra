import { Request, Response } from "express";
import Song from "../../Models/song.Model";
import Topic from "../../Models/topic.Model";
import Singer from "../../Models/singer.Model";

//[GET] /admin/songs
export const index = async (req: Request, res: Response) => {
    const songs = await Song.find({ deleted: false });

    res.render('Admin/Pages/Songs/index', {
        pageTitle: 'Topics Management',
        songs: songs
    })
}

//[GET] /admin/songs
export const create = async (req: Request, res: Response) => {
    const topics = await Topic.find({ 
        status: 'active',
        deleted: false 
    }).select('title');
    const singers = await Singer.find({
        status: 'active',
        deleted: false
    }).select('fullName');

    res.render('Admin/Pages/Songs/create', {
        pageTitle: 'Topics Management',
        topics: topics,
        singers: singers
    })
}