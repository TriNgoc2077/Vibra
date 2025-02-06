import { Router } from 'express';
const router: Router = Router();

import * as Controller from "../../Controllers/Client/search.Controller";

router.get('/:responseType', Controller.result);


export const searchRouter: Router = router;