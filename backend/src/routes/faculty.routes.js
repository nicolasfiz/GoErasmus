import {Router} from 'express'
const router = Router();

import {methods as facultyCtrl} from '../controllers/faculty.controller';
// import * as authJwt from "../middlewares/authJwt";

router.post('/', facultyCtrl.addFaculty);
router.get('/', facultyCtrl.getFaculties);
router.put('/:id', facultyCtrl.updateFaculty);
router.delete('/:id', facultyCtrl.deleteFaculty);

export default router;