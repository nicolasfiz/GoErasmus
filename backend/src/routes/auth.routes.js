import {Router} from 'express'
const router = Router();

import * as authCtrl from '../controllers/auth.controller';

router.post('/signin', authCtrl.signIn);
router.post('/signup', authCtrl.signUp);
router.post('/recover-password', authCtrl.sendPasswordtoUserEmail);
router.get('/confirmAccount/:token', authCtrl.confirmAccount);
router.get('/:token',authCtrl.getAccount);

export default router;