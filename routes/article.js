'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

// Rutas para articulos
router.post('/save', ArticleController.save);

module.exports = router;
