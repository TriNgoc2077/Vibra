import { Express } from 'express';
import { topicRouters } from './topic.Router';
import { songRouters } from './song.Router';
import { favoriteSongRouters } from './favorite-song.Router';
import { userRouters } from './user.Router';
import { searchRouter } from './search.Router';
import { homePageRouters } from './homePage.Router';
const clientRouters = (app: Express): void => {
    app.use(`/topics`, topicRouters);
    app.use(`/songs`, songRouters);
    app.use(`/favorite-songs`, favoriteSongRouters);
    app.use(`/user`, userRouters);
    app.use(`/search`, searchRouter);
    app.use('/', homePageRouters);
}
export default clientRouters;