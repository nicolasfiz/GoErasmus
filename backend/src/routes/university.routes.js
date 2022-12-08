import {Router} from 'express'
const router = Router();

import {methods as universityCtrl} from '../controllers/university.controller';
// import * as authJwt from "../middlewares/authJwt";

router.post('/', universityCtrl.addUniversity);
router.get('/', universityCtrl.getUniversities);
router.get('/:id', universityCtrl.getUniversityById);
router.get('/:name/length', universityCtrl.getUniversitiesCityLength);
router.put('/:id', universityCtrl.updateUniversity);
router.delete('/:id', universityCtrl.deleteUniversity);

export default router;