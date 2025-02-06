"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listens = exports.favorite = exports.like = exports.detail = exports.listSong = void 0;
const topic_Model_1 = __importDefault(require("../../Models/topic.Model"));
const song_Model_1 = __importDefault(require("../../Models/song.Model"));
const singer_Model_1 = __importDefault(require("../../Models/singer.Model"));
const user_Model_1 = __importDefault(require("../../Models/user.Model"));
const removeTimestamps_1 = require("../../Helpers/removeTimestamps");
const listSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slugTopic;
        const topic = yield topic_Model_1.default.findOne({
            slug: slug,
            status: 'active',
            deleted: false
        });
        if (!topic) {
            throw new Error(`Not found topic: ${slug}`);
        }
        const songs = yield song_Model_1.default.find({
            topicId: topic.id,
            status: "active",
            deleted: false
        }).select('id title avatar singerId like slug');
        const user = yield user_Model_1.default.findOne({ userToken: req.cookies.userToken, deleted: false }).select("favoriteSongs");
        const favoriteSongs = (user === null || user === void 0 ? void 0 : user.favoriteSongs) || [];
        const songsWithSingers = yield Promise.all(songs.map((song) => __awaiter(void 0, void 0, void 0, function* () {
            const infoSinger = yield singer_Model_1.default.findOne({
                _id: song.singerId,
                deleted: false
            }).select("fullName slug").lean();
            song.infoSinger = infoSinger;
            song.favorited = (favoriteSongs.includes(song.id));
            return song;
        })));
        res.render('client/pages/songs/list', {
            pageTitle: topic.title,
            songs: songsWithSingers
        });
    }
    catch (error) {
        console.log(error.message);
        res.redirect(req.get("Referrer") || "/");
    }
});
exports.listSong = listSong;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugSong = req.params.slugSong;
        const song = yield song_Model_1.default.findOne({
            slug: slugSong,
            status: "active",
            deleted: false
        });
        if (!song) {
            throw new Error('Not found song !');
        }
        const topicOfSong = yield topic_Model_1.default.findOne({ _id: song.topicId, deleted: false }).select('title slug');
        const singerOfSong = yield singer_Model_1.default.findOne({ _id: song.singerId, deleted: false }).select('id fullName slug');
        const user = yield user_Model_1.default.findOne({ userToken: req.cookies.userToken, status: 'active', deleted: false }).select('likeSongs favoriteSongs');
        const favoriteSongs = (user === null || user === void 0 ? void 0 : user.favoriteSongs) || [];
        const likeSongs = (user === null || user === void 0 ? void 0 : user.likeSongs) || [];
        const liked = (likeSongs.includes(song.id));
        const favorited = (favoriteSongs.includes(song.id));
        const lyrics = (0, removeTimestamps_1.removeTimestamps)(song.lyrics);
        const songs = yield song_Model_1.default.find({
            singerId: song.singerId,
            _id: { $ne: song.id },
            status: 'active',
            deleted: false
        }).limit(8).select('id title avatar singerId like slug');
        for (const song of songs) {
            song.favorited = (favoriteSongs.includes(song.id));
        }
        const topics = yield topic_Model_1.default.find({ deleted: false }).limit(4);
        res.render('client/pages/songs/detail', {
            pageTitle: song.title,
            song: song,
            lyrics: lyrics,
            infoTopic: topicOfSong,
            infoSinger: singerOfSong,
            liked: liked,
            favorited: favorited,
            songs: songs,
            topics: topics
        });
    }
    catch (error) {
        console.log(error.message);
        res.redirect(req.get("Referrer") || "/");
    }
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.cookies);
        const songId = req.params.songId;
        const song = yield song_Model_1.default.findOne({
            _id: songId,
            status: "active",
            deleted: false
        });
        if (!song || !song.like) {
            throw new Error('not found song');
        }
        const typeLike = req.params.typeLike;
        yield song_Model_1.default.updateOne({ _id: songId }, { like: (typeLike === 'like' ? song.like + 1 : song.like - 1) });
        const user = yield user_Model_1.default.findOne({
            userToken: req.cookies.userToken
        });
        if (!user) {
            throw new Error('Not found user !');
        }
        if (typeLike === 'like') {
            yield user_Model_1.default.updateOne({ userToken: req.cookies.userToken }, { $push: { likeSongs: songId } });
        }
        else {
            yield user_Model_1.default.updateOne({ userToken: req.cookies.userToken }, { $pull: { likeSongs: songId } });
        }
        res.json({
            code: 200,
            message: 'like successfully !'
        });
    }
    catch (error) {
        console.log(error.message);
        res.json({
            code: 400,
            message: 'like failed'
        });
        res.redirect(req.get("Referrer") || "/");
    }
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songId = req.params.songId;
        const song = yield song_Model_1.default.findOne({
            _id: songId,
            status: "active",
            deleted: false
        });
        if (!song || !song.like) {
            throw new Error('not found song');
        }
        const typeAdd = req.params.typeAdd;
        if (typeAdd === 'favorite') {
            yield user_Model_1.default.updateOne({ userToken: req.cookies.userToken }, { $push: { favoriteSongs: songId } });
        }
        else if (typeAdd === 'unfavorite') {
            yield user_Model_1.default.updateOne({ userToken: req.cookies.userToken }, { $pull: { favoriteSongs: songId } });
        }
        res.json({
            code: 200,
            message: 'remove successfully !'
        });
    }
    catch (error) {
        console.log(error.message);
        res.json({
            code: 400,
            message: 'remove failed'
        });
        res.redirect(req.get("Referrer") || "/");
    }
});
exports.favorite = favorite;
const listens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songId = req.params.songId;
        const song = yield song_Model_1.default.findOne({
            _id: songId,
            status: "active",
            deleted: false
        });
        if (!song) {
            throw new Error('not found song');
        }
        const listens = song.listens + 1;
        yield song_Model_1.default.updateOne({ _id: songId }, { listens: listens });
        const refreshSong = yield song_Model_1.default.findOne({ _id: songId });
        res.json({
            code: 200,
            message: 'increase successfully !',
            listens: refreshSong.listens
        });
    }
    catch (error) {
        console.log(error.message);
        res.json({
            code: 400,
            message: error.message
        });
        res.redirect(req.get("Referrer") || "/");
    }
});
exports.listens = listens;
