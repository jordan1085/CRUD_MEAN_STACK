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
app.post('/probando', (req, res) => {
    
    var hola = req.body.hola; // Solicitud Datos que resivo req
    
    return res.status(200).send({ // Respuesta: Datos que devuelvo 
        nombre: 'Jordan',
        apellido: 'hernando',
        hola
    })
})

// Exportar modulo (fichero actual)
module.exports = app;