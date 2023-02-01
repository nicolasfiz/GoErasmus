import {Router} from 'express'
const router = Router();

import {methods as articleCtrl} from '../controllers/article.controller';
// import * as authJwt from "../middlewares/authJwt";

router.post('/', articleCtrl.addDraftArticle);
router.get('/', articleCtrl.getArticles);
router.get('/:name/length', articleCtrl.getCityArticlesLength);
router.get('/:id', articleCtrl.getArticleById);
router.put('/:id', articleCtrl.publishArticle);
router.delete('/:id', articleCtrl.deleteArticle);
router.post('/comment', articleCtrl.publishComment);
router.post('/:usuario_idUsuario/:articulo_idArticulo', articleCtrl.voteArticle);
router.delete('/:usuario_idUsuario/:articulo_idArticulo', articleCtrl.deleteArticleVote);

export default router;