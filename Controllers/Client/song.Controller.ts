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
