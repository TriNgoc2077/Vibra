import { Request, Response } from 'express';
import Topic from '../../Models/topic.Model';
import Song from '../../Models/song.Model';
import Singer from '../../Models/singer.Model';
import User from '../../Models/user.Model';

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
        }).select('avatar title slug singer like');
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
        const topicOfSong = await Topic.findOne({ _id: song.topicId, deleted: false }).select('title slug');
        const singerOfSong = await Singer.findOne({ _id: song.singer?.singerId, deleted: false }).select('id fullName slug');
        const user = await User.findOne({ userToken: req.cookies.userToken, status: 'active', deleted: false }).select('likeSongs favoriteSongs');

        const liked: boolean = (user?.likeSongs.find(id => id === song.id) ? true : false);
        const favorited: boolean = (user?.favoriteSongs.find(id => id === song.id) ? true : false);
        const songs = await Song.find({
            'singer.singerId': song.singer?.singerId,
            _id: { $ne: song._id },
            status: 'active',
            deleted: false
        }).limit(8);
        const topics = await Topic.find({ deleted: false }).limit(4);
        res.render('client/pages/Songs/detail', { 
            pageTitle: song.title,
            song: song,
            infoTopic: topicOfSong,
            infoSinger: singerOfSong,
            liked: liked,
            favorited: favorited,
            songs: songs,
            topics: topics
        }); 
    } catch(error) {
       console.log((error as Error).message); 
       res.redirect(req.get("Referrer") || "/");
    }
}

//[PATCH] /like/:typeLike/:songId
export const like = async (req: Request, res: Response) => {
    try {    
        console.log(req.cookies);
        const songId: string = req.params.songId;
        const song = await Song.findOne({ 
            _id: songId,
            status: "active",
            deleted: false 
        });
        if (!song || !song.like) {
            throw new Error('not found song');
        }
        //update like song
        const typeLike: string = req.params.typeLike;
        await Song.updateOne(
            { _id: songId }, 
            { like: (typeLike === 'like' ? song.like + 1 : song.like - 1) }    
        )
        //save like to user
        const user = await User.findOne({
            userToken: req.cookies.userToken
        });
        if (!user) {
            throw new Error('Not found user !');
        }
        if (typeLike === 'like') {
            await User.updateOne(
                { userToken: req.cookies.userToken},
                { $push: { likeSongs: songId }}
            );
        } else {
            await User.updateOne(
                { userToken: req.cookies.userToken},
                { $pull: { likeSongs: songId }}
            );
        }
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
       res.redirect(req.get("Referrer") || "/");
    }
}

//[PATCH] /favorite/:typeLike/:songId
export const favorite = async (req: Request, res: Response) => {
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
        //add to favorite list
        const typeAdd: string = req.params.typeAdd;
        if (typeAdd === 'favorite') {
            await User.updateOne(
                { userToken: req.cookies.userToken },
                { $push: { favoriteSongs: songId } }
            );
        } else if (typeAdd === 'unfavorite') {
            await User.updateOne(
                { userToken: req.cookies.userToken },
                { $pull: { favoriteSongs: songId } }
            );
        }
        res.json({
            code: 200,
            message: 'remove successfully !'
        });
    } catch(error) {
       console.log((error as Error).message); 
       res.json({
        code: 400,
        message: 'remove failed'
       });
       res.redirect(req.get("Referrer") || "/");
    }
}