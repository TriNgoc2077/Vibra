import { Request, Response } from "express";
import Song from "../../Models/song.Model";

//[GET] /admin/topics
export const index = async (req: Request, res: Response) => {
    const songs = await Song.find({ deleted: false });

    res.render('Admin/Pages/Songs/index', {
        pageTitle: 'Topics Management',
        songs: songs
    })
}