import { Router } from 'express';
const router: Router = Router();

import * as Controller from '../../controllers/admin/topic.Controller';

router.get('/', Controller.index);

export const topicRouters: Router = router;