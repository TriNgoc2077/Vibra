import { Router } from "express";
const router: Router = Router();
import * as Controller from '../../Controllers/Client/song.Controller';

router.get('/:slugTopic', Controller.listSong);
router.get('/detail/:slugSong', Controller.detail);
router.patch('/like/:typeLike/:songId', Controller.like);
router.patch('/favorite/:typeAdd/:songId', Controller.favorite);

router.patch('/listens/:songId', Controller.listens);



export const songRouters: Router = router;