import { Router } from 'express';
import { pageModuleRelatorios } from '../controllers/module-relatorios-controller.js'
import { isAuth } from '../middlewares/is-auth.js';
import { checkPermission } from '../middlewares/check-permission.js';

const router = Router();

router.get('/', isAuth, checkPermission, pageModuleRelatorios);

export default router;