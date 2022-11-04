import {Router} from 'express'
const router = Router();

import {methods as citgalleryCtrl} from '../controllers/citiesgallery.controller';

router.post('/:ciudad_idCiudad', citgalleryCtrl.addCityImage);
router.get('/', citgalleryCtrl.getCityImages);
router.get('/:id', citgalleryCtrl.getCityImageById);
router.delete('/:id', citgalleryCtrl.deleteCityImage);

export default router;