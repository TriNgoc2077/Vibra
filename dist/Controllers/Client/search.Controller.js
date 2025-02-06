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
exports.result = void 0;
const song_Model_1 = __importDefault(require("../../Models/song.Model"));
const singer_Model_1 = __importDefault(require("../../Models/singer.Model"));
const user_Model_1 = __importDefault(require("../../Models/user.Model"));
const convertToSlug_1 = require("../../Helpers/convertToSlug");
const result = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keyword = `${req.query.keyword}`;
        let resultSongs = [];
        if (keyword) {
            const keywordRegex = new RegExp(keyword, "i");
            const keywordSlug = (0, convertToSlug_1.convertToSlug)(keyword);
            const keywordSlugRegex = new RegExp(keywordSlug, "i");
            const songs = yield song_Model_1.default.find({
                $or: [
                    { title: keywordRegex },
                    { slug: keywordSlugRegex }
                ]
            }).lean();
            const user = yield user_Model_1.default.findOne({ userToken: req.cookies.userToken, deleted: false }).select("favoriteSongs");
            const favoriteSongs = (user === null || user === void 0 ? void 0 : user.favoriteSongs) || [];
            const songsWithSingers = yield Promise.all(songs.map((song) => __awaiter(void 0, void 0, void 0, function* () {
                const infoSinger = yield singer_Model_1.default.findOne({ _id: song.singerId }).select('fullName slug').lean();
                song.infoSinger = infoSinger;
                song.favorited = favoriteSongs.includes(song.id);
                return song;
            })));
            resultSongs = songsWithSingers;
        }
        const type = req.params.responseType;
        if (type === 'result') {
            res.render('Client/Pages/Search/result', {
                pageTitle: `Result of ${keyword}`,
                keyword: keyword,
                songs: resultSongs
            });
        }
        else if (type === 'suggest') {
            res.json({
                code: 200,
                message: 'Take data successfully !',
                songs: resultSongs
            });
        }
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
exports.result = result;
