import {Router} from 'express'
const router = Router();

import {methods as cityCtrl} from '../controllers/city.controller';

router.post('/', cityCtrl.addCity);
router.get('/', cityCtrl.getCities);
router.get('/:id', cityCtrl.getCityById);
router.put('/:id', cityCtrl.updateCity);
router.delete('/:id', cityCtrl.deleteCity);

export default router;