'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

// Configuar modulo para subida de archivos
var multiparty = require('connect-multiparty');
var md_upload = multiparty({ uploadDir: './upload/articles' });

// Rutas para guardar articulos
router.post('/save', ArticleController.save);

// Ruta para cargar articulos con parametro last como opcional ?
router.get('/articles/:last?', ArticleController.getArticles);

// Ruta para 1 solo articulo
router.get('/article/:id', ArticleController.getArticle);

// Ruta para actualizar 
router.put('/article/:id', ArticleController.upDate);

// Ruta para eliminar 
router.delete('/article/:id', ArticleController.delete);

// Ruta para subir archivos
router.post('/upload-image/:id', md_upload, ArticleController.upload);

// Ruta para sacar imagen
router.get('/get-image/:image', ArticleController.getImage);

// Ruta para el buscador
router.get('/search/:search', ArticleController.search);

module.exports = router;
