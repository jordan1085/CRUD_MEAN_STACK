'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

// Rutas para guardar articulos
router.post('/save', ArticleController.save);

// Ruta para cargar articulos con parametro last como opcional ?
router.get('/articles/:last?', ArticleController.getArticles);

// Ruta para 1 solo articulo
router.get('/article/:id', ArticleController.getArticle);



module.exports = router;
