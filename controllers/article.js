// Metodos y rutas 

'use strict'

var validator = require('validator'); 
var Article = require('../models/article');

var controller = {

    datosCurso: (req, res) => {
    
        var hola = req.body.hola; // Solicitud Datos que resivo req
        
        return res.status(200).send({ // Respuesta: Datos que devuelvo 
            nombre: 'Jordan',
            apellido: 'hernando',
            hola
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            mensaje: 'Soy la accion test'
        });
    },

    // Metdo para crear un nuevo articulo
    save: (req, res) => {

        // Recoger parametros por post
        var params = req.body;

        // Validar datos (validator)

        try {
            
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        } catch (error) {
            
            return res.status(200).send({
                mensaje: 'Faltan dattos !'
            });
        
        }

        if(validate_title && validate_content) {
            // Crear el objeto a guardar

            // Asignar valores

            // Guardar el article

            // DEvolvar respuesta           
                
        
        } else {
            return res.status(200).send({
                mensaje: 'Los datos no son validos'
            });
        }
    }
}; //End controller


module.exports = controller;