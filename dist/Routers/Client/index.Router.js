"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_Router_1 = require("./topic.Router");
const song_Router_1 = require("./song.Router");
const favorite_song_Router_1 = require("./favorite-song.Router");
const user_Router_1 = require("./user.Router");
const search_Router_1 = require("./search.Router");
const clientRouters = (app) => {
    app.use(`/topics`, topic_Router_1.topicRouters);
    app.use(`/songs`, song_Router_1.songRouters);
    app.use(`/favorite-songs`, favorite_song_Router_1.favoriteSongRouters);
    app.use(`/user`, user_Router_1.userRouters);
    app.use(`/search`, search_Router_1.searchRouter);
};
exports.default = clientRouters;
