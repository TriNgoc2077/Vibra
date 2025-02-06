import { Request, Response } from "express";
import User from "../../Models/user.Model";
import Song from "../../Models/song.Model";
import Singer from "../../Models/singer.Model";
interface Singer {
    fullName: string;
    slug: string;
}
interface Song {
    title: string;
    avatar: string; 
    singerId: string;
    slug: string;
    infoSinger?: Singer | null;
}
//[GET] /favorite-songs/
export const index = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ userToken: req.cookies.userToken, status: 'active', deleted: false }).select("favoriteSongs");
        if (!user) {
            throw new Error('Not found user');
        }
        const songs = await Promise.all(
            user.favoriteSongs.map(async (songId) => {
                const song = await Song.findOne({ _id: songId, status: "active", deleted: false }).select("title avatar singerId slug").lean() as Song;
                const infoSinger = await Singer.findOne({ _id: song?.singerId, deleted: false }).select("id fullName slug").lean() as Singer;
                song.infoSinger = infoSinger;
                return song;
            })
            
        );
        res.render('client/pages/favorite-songs/index', {
            pageTitle: 'Favorite Song',
            songs: songs
        });
    } catch(error) {
        console.log((error as Error).message); 
        res.redirect(req.get("Referrer") || "/");
     }
};