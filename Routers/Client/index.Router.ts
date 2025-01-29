import { Express } from 'express';
import { topicRouters } from './topic.Router';
import { songRouters } from './song.Router';
const clientRouters = (app: Express): void => {
    app.use(`/topics`, topicRouters);
    app.use(`/songs`, songRouters);

}
export default clientRouters;