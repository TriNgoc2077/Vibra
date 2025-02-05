import { Request, Response } from "express";
import Song from "../../Models/song.Model";
import Topic from "../../Models/topic.Model";
import Singer from "../../Models/singer.Model";
import { systemConfig } from "../../Config/config";
//[GET] /admin/songs
export const index = async (req: Request, res: Response) => {
    try {
        const songs = await Song.find({ deleted: false });

        res.render('Admin/Pages/Songs/index', {
            pageTitle: 'Topics Management',
            songs: songs
        })
    } catch(error) {
        console.log((error as Error).message); 
        res.redirect(req.get("Referrer") || "/");
    }
}

//[GET] /admin/songs
export const create = async (req: Request, res: Response) => {
    try {
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
    } catch(error) {
        console.log((error as Error).message); 
        res.redirect(req.get("Referrer") || "/");
    }
}

//[POST] /admin/createPost
export const createPost = async (req: Request, res: Response) => {
    try {
        let dataSong = req.body;
        // after upload, avatar and audio return an array (due to upload fields)
        if (dataSong.avatar)     dataSong.avatar = dataSong.avatar[0];
        if (dataSong.audio) dataSong.audio = dataSong.audio[0];
        const song = new Song(dataSong);
        await song.save();
        res.redirect(`${systemConfig.prefixAdmin}/songs`);
    } catch(error) {
        console.log((error as Error).message); 
        res.redirect(req.get("Referrer") || "/");
    }
}