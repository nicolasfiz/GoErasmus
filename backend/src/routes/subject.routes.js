import {Router} from 'express'
const router = Router();

import {methods as subjectCtrl} from '../controllers/subject.controller';
// import * as authJwt from "../middlewares/authJwt";

router.post('/', subjectCtrl.addSubject);
router.get('/', subjectCtrl.getSubjects);
router.put('/:id', subjectCtrl.updateSubject);
router.delete('/:id', subjectCtrl.deleteSubject);

export default router;