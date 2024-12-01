import { Router } from 'express';
import { pageModuleProdutos } from '../controllers/module-produtos-controller.js'
import { isAuth } from '../middlewares/is-auth.js';
import { hasPermission } from '../middlewares/has-permission.js';

const router = Router();

router.get('/', isAuth, hasPermission, pageModuleProdutos);

export default router;