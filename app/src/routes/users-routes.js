import { Router } from 'express';
import { isAuth } from '../middlewares/is-auth.js';
import { hasPermission } from '../middlewares/has-permission.js';
import { getUsers } from '../controllers/users-controller.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.get('/', isAuth, hasPermission, getUsers);

export default router;