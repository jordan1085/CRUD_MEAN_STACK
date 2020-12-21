// Crear servidor con express
'use strict'

// Cargar modulos
var express = require('express');
var bodyParser = require('body-parser');

// Ejecutar express
var app = express();

// Cargar ficheros de ruta
var article_rutes = require('./routes/article');

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS

// Añadir prefijos a rutas / Cargar rutas
app.use('/api', article_rutes);

// Exportar modulo (fichero actual)
module.exports = app;