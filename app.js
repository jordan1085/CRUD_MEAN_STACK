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

// CORS (Acceso cruzado entre dominios) permitira las llamadas http,ajax, async
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Añadir prefijos a rutas / Cargar rutas
app.use('/api', article_rutes);

// Exportar modulo (fichero actual)
module.exports = app;