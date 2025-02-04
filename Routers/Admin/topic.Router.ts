import { Router } from 'express';
const router: Router = Router();

import * as Controller from '../../Controllers/Admin/topic.Controller';

router.get('/', Controller.index);

export const topicRouters: Router = router;