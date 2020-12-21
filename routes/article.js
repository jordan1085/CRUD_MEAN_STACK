'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

// Rutas para guardar articulos
router.post('/save', ArticleController.save);

// Ruta para cargar articulos
router.get('/articles', ArticleController.getArticles);

module.exports = router;
