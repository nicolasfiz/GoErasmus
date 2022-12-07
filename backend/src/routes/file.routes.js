import {Router} from 'express'
const router = Router();

import {methods as fileCtrl} from '../controllers/file.controller';
//import * as authJwt from "../middlewares/authJwt";

router.get('/', fileCtrl.getFiles);
router.delete('/:id', fileCtrl.deleteFile);

export default router;