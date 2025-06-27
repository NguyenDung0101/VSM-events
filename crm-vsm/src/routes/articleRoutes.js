const express = require('express');
const ArticleController = require('../controllers/articleController');

const router = express.Router();
const articleController = new ArticleController();

router.post('/articles', articleController.createArticle);
router.get('/articles', articleController.getAllArticles);
router.get('/articles/:id', articleController.getArticleById);
router.put('/articles/:id', articleController.updateArticle);
router.delete('/articles/:id', articleController.deleteArticle);

module.exports = router;