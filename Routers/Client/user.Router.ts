import { Router } from "express";

const router: Router = Router();
import * as Controller from '../../controllers/client/user.Controller';
import * as validateMiddlewares from '../../middlewares/client/validateLogin.Middleware';
//register => post(post verify) => page otp(get verify) => save user(postRegister)
router.get('/register', Controller.register);
router.post('/verify', validateMiddlewares.validateRegister, Controller.verifyPost);
router.get('/verify', Controller.verify);
router.post('/register', Controller.registerPost);


router.get('/login', Controller.login);
router.post('/login', validateMiddlewares.validateLogin, Controller.loginPost);


export const userRouters: Router = router;