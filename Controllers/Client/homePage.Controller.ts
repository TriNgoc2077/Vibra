import { Request, Response } from "express";
import Singer from "../../Models/singer.Model";
import Song from "../../Models/song.Model";
import Topic from "../../Models/topic.Model";

export const index = async (req: Request, res: Response ) => {
    try{ const songs = await Song.find({}).select("-lyrics -audio").limit(10).populate([{path: 'singerId', select: 'fullName'}, {path: 'topicId', select: 'title'}]);
    const topics = await Topic.find({}).limit(10);
    const singers = await Singer.find({}).limit(10);
    res.render('Client/Pages/HomePage/index', {
        pageTitle: 'Home',
        songs, topics, singers
    })} catch(error) {
        console.log(error);
    }
}