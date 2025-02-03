import { Express } from 'express';
import { dashboardRouter } from './dashboard.Router';
import { systemConfig } from '../../Config/config';

const adminRouter = (app: Express): void => {
    const PATH_ADMIN = `${systemConfig.prefixAdmin}`;

    app.use(`${PATH_ADMIN}/dashboard`, dashboardRouter);
}
export default adminRouter;