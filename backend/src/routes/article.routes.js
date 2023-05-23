import {Router} from 'express'
const router = Router()

import {methods as articleCtrl} from '../controllers/article.controller'
// import * as authJwt from "../middlewares/authJwt"

router.post('/', articleCtrl.addDraftArticle)
router.get('/', articleCtrl.getArticles)
router.get('/:id', articleCtrl.getArticleById)
router.get('/likes/:id', articleCtrl.getLikesArticleById)
router.put('/:id', articleCtrl.publishArticle)
router.post('/comment', articleCtrl.publishComment)
router.delete('/:id', articleCtrl.deleteArticle)
router.post('/:usuario_idUsuario/:articulo_idArticulo', articleCtrl.voteArticle)
router.delete('/:usuario_idUsuario/:articulo_idArticulo', articleCtrl.deleteArticleVote)
router.get('/:id/comments', articleCtrl.getArticleComments)

export default router