import { Router } from 'express';
const router: Router = Router();

import * as Controller from '../../controllers/admin/dashboard.Controller';

router.get('/', Controller.index);

export const dashboardRouters: Router = router;