import { Router } from 'express';
import { pageModuleProdutos } from '../controllers/module-produtos-controller.js'
import { isAuth } from '../middlewares/is-auth.js';
import { checkPermission } from '../middlewares/check-permission.js';

const router = Router();

router.get('/', isAuth, checkPermission, pageModuleProdutos);

export default router;