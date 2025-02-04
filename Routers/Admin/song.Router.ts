import { Router } from 'express';
const router: Router = Router();

import * as Controller from '../../Controllers/Admin/song.Controller';

router.get('/', Controller.index);

export const songRouters: Router = router;