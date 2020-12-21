'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

// Rutas para guardar articulos
router.post('/save', ArticleController.save);

// Ruta para cargar articulos con parametro last como opcional ?
router.get('/articles/:last?', ArticleController.getArticles);


module.exports = router;
