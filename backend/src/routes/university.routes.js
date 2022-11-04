import {Router} from 'express'
const router = Router();

import {methods as universityCtrl} from '../controllers/university.controller';

router.post('/', universityCtrl.addUniversity);
router.get('/', universityCtrl.getUniversities);
router.get('/:id', universityCtrl.getUniversityById);
router.put('/:id', universityCtrl.updateUniversity);
router.delete('/:id', universityCtrl.deleteUniversity);

export default router;