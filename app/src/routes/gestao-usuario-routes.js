import { Router } from 'express';
import { pageGestaoUsuario, pageAddUser, addUser, deleteUser, pageChangePermission, changePermission } from '../controllers/gestao-usuario-controller.js'
import { isAuth } from '../middlewares/is-auth.js';
import { checkPermission } from '../middlewares/check-permission.js';

const router = Router();

router.get('/', isAuth, checkPermission, pageGestaoUsuario);

router.get('/add', isAuth, checkPermission, pageAddUser);

router.post('/add', isAuth, checkPermission, addUser);

router.get('/changePermission/:id', isAuth, checkPermission, pageChangePermission);

router.post('/changePermission/:id', isAuth, checkPermission, changePermission);

router.delete('/delete/:id', isAuth, checkPermission, deleteUser);

export default router;