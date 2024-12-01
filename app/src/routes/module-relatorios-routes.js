import { Router } from 'express';
import { pageModuleRelatorios } from '../controllers/module-relatorios-controller.js'
import { isAuth } from '../middlewares/is-auth.js';
import { hasPermission } from '../middlewares/has-permission.js';

const router = Router();

router.get('/', isAuth, hasPermission, pageModuleRelatorios);

export default router;