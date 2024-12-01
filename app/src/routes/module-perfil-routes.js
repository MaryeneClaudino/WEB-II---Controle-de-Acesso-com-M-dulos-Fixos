import { Router } from 'express';
import { pageModulePerfil, changePhoto } from '../controllers/module-perfil-controller.js'
import { isAuth } from '../middlewares/is-auth.js';
import { checkPermission } from '../middlewares/check-permission.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.get('/', isAuth, checkPermission, pageModulePerfil);
router.post('/', isAuth, checkPermission, upload.single('file'), changePhoto);

export default router;