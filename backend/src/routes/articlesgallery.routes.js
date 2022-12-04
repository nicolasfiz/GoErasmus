import {Router} from 'express'
const router = Router();

import {methods as artgalleryCtrl} from '../controllers/articlesgallery.controller';
// import * as authJwt from "../middlewares/authJwt";

router.post('/:articulo_idArticulo', artgalleryCtrl.addArticleImage);
router.get('/', artgalleryCtrl.getArticleImages);
router.get('/:id', artgalleryCtrl.getArticleImageById);
router.delete('/:id', artgalleryCtrl.deleteArticleImage);

export default router;