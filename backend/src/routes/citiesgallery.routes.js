import {Router} from 'express'
const router = Router()

import {methods as citgalleryCtrl} from '../controllers/citiesgallery.controller'
// import * as authJwt from "../middlewares/authJwt"

router.post('/:id', citgalleryCtrl.addCityImages)
router.get('/', citgalleryCtrl.getCityImages)
router.delete('/:id', citgalleryCtrl.deleteCityImages)

export default router