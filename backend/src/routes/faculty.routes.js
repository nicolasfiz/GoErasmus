import {Router} from 'express'
const router = Router();

import {methods as facultyCtrl} from '../controllers/faculty.controller';

router.post('/', facultyCtrl.addFaculty);
router.get('/', facultyCtrl.getFaculties);
router.get('/:id', facultyCtrl.getFacultyById);
router.put('/:id', facultyCtrl.updateFaculty);
router.delete('/:id', facultyCtrl.deleteFaculty);

export default router;