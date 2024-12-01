import { Router } from 'express';
import { pageModuleFinancieiro } from '../controllers/module-financeiro-controller.js'
import { isAuth } from '../middlewares/is-auth.js';
import { checkPermission } from '../middlewares/check-permission.js';

const router = Router();

router.get('/', isAuth, checkPermission, pageModuleFinancieiro);

export default router;