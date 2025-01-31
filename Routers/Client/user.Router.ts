import { Router } from "express";

const router: Router = Router();
import * as Controller from '../../Controllers/Client/user.Controller';
import * as validateMiddlewares from '../../Middlewares/validateLogin.Middleware';
router.get('/login', Controller.login);
router.post('/login', validateMiddlewares.validateLogin, Controller.loginPost);


export const userRouters: Router = router;