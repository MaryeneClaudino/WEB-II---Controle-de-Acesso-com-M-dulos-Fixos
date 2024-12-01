import { Router } from 'express';
import { isAuth } from '../middlewares/is-auth.js';
import { checkPermission } from '../middlewares/check-permission.js';
import { getUsers } from '../controllers/users-controller.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.get('/', isAuth, checkPermission, getUsers);

export default router;