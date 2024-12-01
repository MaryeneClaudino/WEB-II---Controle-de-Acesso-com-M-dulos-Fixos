import { Router } from 'express';
import { isAuth } from '../middlewares/is-auth.js';
import { hasPermission } from '../middlewares/has-permission.js';
import { pageAccessDenied } from '../controllers/access-denied-controller.js'

const router = Router();

router.get('/', isAuth, pageAccessDenied);

export default router;