import { Express } from 'express';
import { dashboardRouters } from './dashboard.Router';
import { systemConfig } from '../../Config/config';
import { topicRouters } from './topic.Router';

const adminRouter = (app: Express): void => {
    const PATH_ADMIN = `${systemConfig.prefixAdmin}`;

    app.use(`${PATH_ADMIN}/dashboard`, dashboardRouters);
    app.use(`${PATH_ADMIN}/topics`, topicRouters);

}
export default adminRouter;