import { Router } from "express";
const router: Router = Router();
import * as Controller from '../../Controllers/Client/topic.Controller';
router.get('/', Controller.topics);

export const topicRouters: Router = router;