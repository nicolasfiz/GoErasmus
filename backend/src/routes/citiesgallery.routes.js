import {Router} from 'express'
const router = Router()

import {methods as citygalleryCtrl} from '../controllers/citiesgallery.controller'
// import * as authJwt from "../middlewares/authJwt"

router.post('/:id', citygalleryCtrl.addCityImages)
router.get('/:name', citygalleryCtrl.getCityImages)
router.delete('/:id', citygalleryCtrl.deleteCityImages)

export default router