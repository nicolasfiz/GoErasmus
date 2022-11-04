import {Router} from 'express'
const router = Router();

import {methods as articleCtrl} from '../controllers/article.controller';

router.post('/', articleCtrl.addDraftArticle);
router.get('/', articleCtrl.getArticles);
router.get('/:id', articleCtrl.getArticleById);
router.put('/:id', articleCtrl.updateArticle);
router.delete('/:id', articleCtrl.deleteArticle);

export default router;