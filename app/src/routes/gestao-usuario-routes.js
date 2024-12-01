import { Router } from 'express';
import { pageGestaoUsuario, pageAddUser, addUser, deleteUser, pageChangePermission, changePermission } from '../controllers/gestao-usuario-controller.js'
import { isAuth } from '../middlewares/is-auth.js';
import { hasPermission } from '../middlewares/has-permission.js';

const router = Router();

router.get('/', isAuth, hasPermission, pageGestaoUsuario);

router.get('/add', isAuth, hasPermission, pageAddUser);

router.post('/add', isAuth, hasPermission, addUser);

router.get('/changePermission/:id', isAuth, hasPermission, pageChangePermission);

router.post('/changePermission/:id', isAuth, hasPermission, changePermission);

router.delete('/delete/:id', isAuth, hasPermission, deleteUser);

export default router;