import { Router } from 'express';
import { isAuth } from '../middlewares/is-auth.js';
import { checkPermission } from '../middlewares/check-permission.js';
import { login, pageLogin, logout } from '../controllers/auth-controller.js';

const router = Router();

router.post('/login', login);
router.get('/login', pageLogin);
router.get('/logout', isAuth, checkPermission, logout);

export default router;