'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

// Rutas de prueba
router.get('/test-de-controlador', ArticleController.test);
router.post('/datos-curso', ArticleController.datosCurso);

// Rutas para articulos
router.post('/save', ArticleController.save);

module.exports = router;
