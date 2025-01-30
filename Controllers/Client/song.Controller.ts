import { Request, Response } from 'express';
import Topic from '../../Models/topic.Model';
import Song from '../../Models/song.Model';
import Singer from '../../Models/singer.Model';

//[GET] /topics/
export const listSong = async (req: Request, res: Response) => {
    try {    
        const slug = req.params.slugTopic;
        const topic = await Topic.findOne({
            slug: slug,
            status: 'active',
            deleted: false
        });
        if (!topic) {
            throw new Error(`Not found topic: ${slug}`);
        }
        const songs = await Song.find({
            topicId: topic.id,
            status: "active", 
            deleted: false
        }).select('avatar title slug singerId like');
        for (let song of songs) {
            let singer = await Singer.findOne({
                _id: song.singerId,
                deleted: false
            });
            (song as any)['infoSinger'] = singer;
        }
        res.render('client/pages/Songs/list', { 
            pageTitle: topic.title,
            songs: songs
        }); 
    } catch(error) {
       console.log((error as Error).message); 
       res.redirect(req.get("Referrer") || "/");
    }
}

//[GET] /detail/:slugSong
export const detail = async (req: Request, res: Response) => {
    try {    
        const slugSong: string = req.params.slugSong;
        const song = await Song.findOne({ 
            slug: slugSong,
            status: "active",
            deleted: false
        });
        if (!song) {
            throw new Error('Not found song !');
        }
        const topic = await Topic.findOne({ _id: song.topicId, deleted: false }).select('title slug');
        const singer = await Singer.findOne({ _id: song.singerId, deleted: false }).select('fullName slug');
        
        res.render('client/pages/Songs/detail', { 
            pageTitle: song.title,
            song: song,
            infoTopic: topic,
            infoSinger: singer
        }); 
    } catch(error) {
       console.log((error as Error).message); 
       res.redirect(req.get("Referrer") || "/");
    }
}

//[PATCH] /:typeLike/:songId
export const like = async (req: Request, res: Response) => {
    try {    
        const songId: string = req.params.songId;
        const song = await Song.findOne({ 
            _id: songId,
            status: "active",
            deleted: false 
        });
        if (!song || !song.like) {
            throw new Error('not found song');
        }
        
        const typeLike: string = req.params.typeLike;
        await Song.updateOne(
            { _id: songId }, 
            { like: (typeLike === 'like' ? song.like + 1 : song.like - 1) }    
        )
        res.json({
            code: 200,
            message: 'like successfully !'
        });
    } catch(error) {
       console.log((error as Error).message); 
       res.json({
        code: 400,
        message: 'like failed'
       });
    }
}
