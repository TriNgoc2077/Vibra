import { Router } from 'express';
import multer from 'multer';
const router: Router = Router();
const upload = multer();
import * as Controller from '../../controllers/admin/upload.Controller';
import { uploadSingle } from '../../middlewares/admin/uploadCloud.Middleware';

router.post(
    '/', 
    upload.single('file'),
    uploadSingle, 
    Controller.index);

export const uploadRouters: Router = router;