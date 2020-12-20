// Crear servidor con express
'use strict'

// Cargar modulos
var express = require('express');
var bodyParser = require('body-parser');

// Ejecutar express
var app = express();

// Cargar ficheros de ruta


// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS

// Añadir prefijos a rutas

// Ruta o metodo de prueba
app.get('/probando', (req, res) => {
    
    
    return res.status(200).send({
        nombre: 'Jordan',
        apellido: 'hernando'
    })
})

// Exportar modulo (fichero actual)
module.exports = app;