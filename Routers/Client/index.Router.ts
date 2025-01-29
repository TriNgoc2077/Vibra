import { Express } from 'express';
import { topicRouters } from './topic.Router';

const clientRouters = (app: Express): void => {
    app.use(`/topics`, topicRouters);
}
export default clientRouters;