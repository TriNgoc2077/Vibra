import { Router } from 'express';
const router: Router = Router();

import * as Controller from '../../Controllers/Admin/song.Controller';

router.get('/', Controller.index);
router.get('/create', Controller.create);


export const songRouters: Router = router;