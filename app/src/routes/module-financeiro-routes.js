import { Router } from 'express';
import { pageModuleFinancieiro } from '../controllers/module-financeiro-controller.js'
import { isAuth } from '../middlewares/is-auth.js';
import { hasPermission } from '../middlewares/has-permission.js';

const router = Router();

router.get('/', isAuth, hasPermission, pageModuleFinancieiro);

export default router;