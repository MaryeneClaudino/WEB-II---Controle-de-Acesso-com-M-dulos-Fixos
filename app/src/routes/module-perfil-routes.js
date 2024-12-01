import { Router } from 'express';
import { pageModulePerfil, changePhoto } from '../controllers/module-perfil-controller.js'
import { isAuth } from '../middlewares/is-auth.js';
import { hasPermission } from '../middlewares/has-permission.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.get('/', isAuth, hasPermission, pageModulePerfil);
router.post('/', isAuth, hasPermission, upload.single('file'), changePhoto);

export default router;