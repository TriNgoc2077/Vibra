import { Router } from "express";
const router: Router = Router();
import * as Controller from '../../Controllers/Client/favorite-songs.Controller';

router.get('/', Controller.index);


export const favoriteSongRouters: Router = router;