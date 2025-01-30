import { Router } from "express";
const router: Router = Router();
import * as Controller from '../../Controllers/Client/song.Controller';

router.get('/:slugTopic', Controller.listSong);
router.get('/detail/:slugSong', Controller.detail);
router.patch('/:typeLike/:songId', Controller.like);



export const songRouters: Router = router;