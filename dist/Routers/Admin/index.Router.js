"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_Router_1 = require("./dashboard.Router");
const config_1 = require("../../Config/config");
const topic_Router_1 = require("./topic.Router");
const song_Router_1 = require("./song.Router");
const upload_Router_1 = require("./upload.Router");
const adminRouter = (app) => {
    const PATH_ADMIN = `${config_1.systemConfig.prefixAdmin}`;
    app.use(`${PATH_ADMIN}/dashboard`, dashboard_Router_1.dashboardRouters);
    app.use(`${PATH_ADMIN}/topics`, topic_Router_1.topicRouters);
    app.use(`${PATH_ADMIN}/songs`, song_Router_1.songRouters);
    app.use(`${PATH_ADMIN}/upload`, upload_Router_1.uploadRouters);
};
exports.default = adminRouter;
