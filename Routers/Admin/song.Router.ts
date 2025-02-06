import { Router } from 'express';
const router: Router = Router();
import multer from 'multer';
const upload = multer();
import * as Controller from '../../Controllers/Admin/song.Controller';
import { uploadSingle, uploadFields } from '../../Middlewares/admin/uploadCloud.Middleware';
import { validateCreate } from '../../Middlewares/admin/validate.Middleware';
router.get('/', Controller.index);
router.get('/create', Controller.create);

router.post(
    '/create', 
    upload.fields([
        { name: 'avatar', maxCount: 1},
        { name: 'audio', maxCount: 1}
    ]),
    uploadFields, 
    validateCreate,
    Controller.createPost
);
router.get('/edit/:id', Controller.edit);
router.patch(
    '/edit/:id', 
    upload.fields([
        { name: 'avatar', maxCount: 1},
        { name: 'audio', maxCount: 1}
    ]),
    uploadFields, 
    Controller.editPatch);


export const songRouters: Router = router;