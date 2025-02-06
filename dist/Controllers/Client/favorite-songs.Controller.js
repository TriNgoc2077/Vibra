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
exports.index = void 0;
const user_Model_1 = __importDefault(require("../../Models/user.Model"));
const song_Model_1 = __importDefault(require("../../Models/song.Model"));
const singer_Model_1 = __importDefault(require("../../Models/singer.Model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_Model_1.default.findOne({ userToken: req.cookies.userToken, status: 'active', deleted: false }).select("favoriteSongs");
        if (!user) {
            throw new Error('Not found user');
        }
        const songs = yield Promise.all(user.favoriteSongs.map((songId) => __awaiter(void 0, void 0, void 0, function* () {
            const song = yield song_Model_1.default.findOne({ _id: songId, status: "active", deleted: false }).select("title avatar singerId slug").lean();
            const infoSinger = yield singer_Model_1.default.findOne({ _id: song === null || song === void 0 ? void 0 : song.singerId, deleted: false }).select("id fullName slug").lean();
            song.infoSinger = infoSinger;
            return song;
        })));
        res.render('client/pages/favorite-songs/index', {
            pageTitle: 'Favorite Song',
            songs: songs
        });
    }
    catch (error) {
        console.log(error.message);
        res.redirect(req.get("Referrer") || "/");
    }
});
exports.index = index;
