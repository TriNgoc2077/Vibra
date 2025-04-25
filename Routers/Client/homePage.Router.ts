import { Router } from "express";
const router: Router = Router();
import * as Controller from '../../Controllers/Client/homePage.Controller';

router.get('/', Controller.index);


export const homePageRouters: Router = router;