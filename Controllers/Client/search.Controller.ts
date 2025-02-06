import { Request, Response } from "express";
import Song from "../../Models/song.Model";
import Singer from "../../Models/singer.Model";
import User from "../../Models/user.Model";
import { convertToSlug } from "../../Helpers/convertToSlug";
interface Singer {
    id: string;
    fullName?: string;
    slug?: string;
}
interface Song {
    id: string,
    title: string;
    avatar: string; 
    singerId: string;
    slug: string;
    favorited: boolean;
    infoSinger?: Singer | null;
}
//[GET] /search/result
export const result = async (req: Request, res: Response) => {
    try {
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
            }).lean() as unknown as Song[];

            const user = await User.findOne({ userToken: req.cookies.userToken, deleted: false }).select("favoriteSongs");
            const favoriteSongs = user?.favoriteSongs || [];

            const songsWithSingers = await Promise.all(
                songs.map(async (song) => {
                    const infoSinger = await Singer.findOne({ _id: song.singerId }).select('fullName slug').lean() as unknown as Singer;
                    song.infoSinger = infoSinger;
                    song.favorited = favoriteSongs.includes(song.id);
                    return song; // The origin array is changed
                })
            );
            resultSongs = songsWithSingers;
        }
        const type = req.params.responseType;
        if (type === 'result') {
            res.render('client/pages/search/result', {
                pageTitle: `Result of ${keyword}`,
                keyword: keyword,
                songs: resultSongs
            })
        } else if (type === 'suggest') {
            res.json({
                code: 200,
                message: 'Take data successfully !',
                songs: resultSongs
            });
        }
    } catch(error) {
        console.log((error as Error).message); 
        res.json({
            code: 400,
            message: (error as Error).message
        });
        res.redirect(req.get("Referrer") || "/");
    }
}
