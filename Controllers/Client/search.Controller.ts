import { Request, Response } from "express";
import Song from "../../Models/song.Model";
import Singer from "../../Models/singer.Model";
import User from "../../Models/user.Model";
import { convertToSlug } from "../../Helpers/convertToSlug";
interface Singer {
    fullName: string;
    slug: string;
}
interface Song {
    id: string;
    title: string;
    avatar: string; 
    singerId: string;
    slug: string;
    favorited: boolean;
    infoSinger?: Singer | null;
}
//[GET] /search/result
export const result = async (req: Request, res: Response) => {
    const keyword: string = `${req.query.keyword}`;
    let resultSongs: Song[] = [];
    if (keyword) {
        //create regex keyword
        const keywordRegex = new RegExp(keyword, "i");
        //create regex slug -
        const keywordSlug = convertToSlug(keyword);
        const keywordSlugRegex = new RegExp(keywordSlug, "i");

        const songs = await Song.find({
            $or: [
                { title: keywordRegex },
                { slug: keywordSlugRegex }
            ]
        }) as Song[];

        const user = await User.findOne({ userToken: req.cookies.userToken, deleted: false }).select("favoriteSongs");
        const favoriteSongs = user?.favoriteSongs || [];

        const songsWithSingers = await Promise.all(
            songs.map(async (song) => {
                const infoSinger = await Singer.findOne({ _id: song.singerId }).select('fullName slug') as Singer;
                song.infoSinger = infoSinger;
                
                song.favorited = favoriteSongs.includes(song.id);
                return song;
            })
        );
        resultSongs = songsWithSingers;
    }
    res.render('Client/Pages/Search/result', {
        pageTitle: `Result of ${keyword}`,
        keyword: keyword,
        songs: resultSongs
    })
}