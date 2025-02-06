import { Router } from "express";
const router: Router = Router();
import * as Controller from '../../controllers/client/topic.Controller';
router.get('/', Controller.topics);

export const topicRouters: Router = router;