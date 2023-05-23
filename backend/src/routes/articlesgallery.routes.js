import {Router} from 'express'
const router = Router()

import {methods as artgalleryCtrl} from '../controllers/articlesgallery.controller'
// import * as authJwt from "../middlewares/authJwt"

router.post('/:id', artgalleryCtrl.addArticleImages)
router.get('/:id', artgalleryCtrl.getArticleImages)

export default router