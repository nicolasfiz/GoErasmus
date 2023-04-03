import {Router} from 'express'
const router = Router()

import {methods as cityCtrl} from '../controllers/city.controller'
// import * as authJwt from "../middlewares/authJwt"

router.post('/', cityCtrl.addCity)
router.get('/', cityCtrl.getCities)
router.get('/name/:id', cityCtrl.getNameByCityId)
router.get('/:name', cityCtrl.getCityByName)
router.put('/:id', cityCtrl.updateCity)
router.delete('/:id', cityCtrl.deleteCity)

export default router