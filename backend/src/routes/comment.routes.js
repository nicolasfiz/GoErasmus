import {Router} from 'express'
const router = Router();

import {methods as commentCtrl} from '../controllers/comment.controller';
//import * as authJwt from "../middlewares/authJwt";

router.get('/', commentCtrl.getComments);
router.delete('/:id', commentCtrl.deleteComment);

export default router;