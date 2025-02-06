import { Router } from 'express';
import multer from 'multer';
const router: Router = Router();
const upload = multer();
import * as Controller from '../../Controllers/Admin/upload.Controller';
import { uploadSingle } from '../../Middlewares/admin/uploadCloud.Middleware';

router.post(
    '/', 
    upload.single('file'),
    uploadSingle, 
    Controller.index);

export const uploadRouters: Router = router;