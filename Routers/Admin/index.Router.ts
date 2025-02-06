import { Express } from 'express';
import { dashboardRouters } from './dashboard.Router';
import { systemConfig } from '../../config/config';
import { topicRouters } from './topic.Router';
import { songRouters } from './song.Router';
import { uploadRouters } from './upload.Router';

const adminRouter = (app: Express): void => {
    const PATH_ADMIN = `${systemConfig.prefixAdmin}`;

    app.use(`${PATH_ADMIN}/dashboard`, dashboardRouters);
    app.use(`${PATH_ADMIN}/topics`, topicRouters);
    app.use(`${PATH_ADMIN}/songs`, songRouters);
    app.use(`${PATH_ADMIN}/upload`, uploadRouters);


}
export default adminRouter;