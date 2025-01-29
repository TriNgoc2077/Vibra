import { Router } from "express";
const router: Router = Router();
import * as Controller from '../../Controllers/Client/song.Controller';

router.get('/:slugTopic', Controller.listSong);

export const songRouters: Router = router;