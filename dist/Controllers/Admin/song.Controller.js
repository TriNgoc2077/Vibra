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
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const song_Model_1 = __importDefault(require("../../Models/song.Model"));
const topic_Model_1 = __importDefault(require("../../Models/topic.Model"));
const singer_Model_1 = __importDefault(require("../../Models/singer.Model"));
const config_1 = require("../../Config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield song_Model_1.default.find({ deleted: false });
        res.render('Admin/Pages/Songs/index', {
            pageTitle: 'Topics Management',
            songs: songs
        });
    }
    catch (error) {
        console.log(error.message);
        res.redirect(req.get("Referrer") || "/");
    }
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield topic_Model_1.default.find({
            status: 'active',
            deleted: false
        }).select('title');
        const singers = yield singer_Model_1.default.find({
            status: 'active',
            deleted: false
        }).select('fullName');
        res.render('Admin/Pages/Songs/create', {
            pageTitle: 'Topics Management',
            topics: topics,
            singers: singers
        });
    }
    catch (error) {
        console.log(error.message);
        res.redirect(req.get("Referrer") || "/");
    }
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let dataSong = req.body;
        if (dataSong.avatar)
            dataSong.avatar = dataSong.avatar[0];
        if (dataSong.audio)
            dataSong.audio = dataSong.audio[0];
        const song = new song_Model_1.default(dataSong);
        yield song.save();
        res.redirect(`${config_1.systemConfig.prefixAdmin}/songs`);
    }
    catch (error) {
        console.log(error.message);
        res.redirect(req.get("Referrer") || "/");
    }
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const song = yield song_Model_1.default.findOne({
            _id: id,
            deleted: false
        });
        const topics = yield topic_Model_1.default.find({
            deleted: false
        }).select('title');
        const singers = yield singer_Model_1.default.find({
            deleted: false
        }).select('fullName');
        res.render('Admin/Pages/Songs/edit', {
            pageTitle: 'Edit Song',
            song: song,
            topics: topics,
            singers: singers
        });
    }
    catch (error) {
        console.log(error.message);
        res.redirect(req.get("Referrer") || "/");
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let dataSong = req.body;
        if (dataSong.avatar)
            dataSong.avatar = dataSong.avatar[0];
        if (dataSong.audio)
            dataSong.audio = dataSong.audio[0];
        yield song_Model_1.default.updateOne({
            _id: id,
            deleted: false
        }, dataSong);
        res.redirect(`${config_1.systemConfig.prefixAdmin}/songs`);
    }
    catch (error) {
        console.log(error.message);
        res.redirect(req.get("Referrer") || "/");
    }
});
exports.editPatch = editPatch;
