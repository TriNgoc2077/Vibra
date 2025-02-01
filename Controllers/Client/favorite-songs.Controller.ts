import { Request, Response } from "express";
import User from "../../Models/user.Model";
import Song from "../../Models/song.Model";
//[GET] /favorite-songs/
export const index = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ userToken: req.cookies.userToken, status: 'active', deleted: false }).select("favoriteSongs");
        let songs = [];
        if (!user) {
            throw new Error('Not found user');
        }
        for (const songId in user.favoriteSongs) {
            const song = await Song.findOne({ _id: songId, status: 'active', deleted: false });
            if (song) {
                songs.push(song);
            }
        }
        res.render('client/Pages/Favorite-songs/index', {
            pageTitle: 'Favorite Song',
            songs: songs
        });
    } catch(error) {
        console.log((error as Error).message); 
        res.redirect(req.get("Referrer") || "/");
     }
};