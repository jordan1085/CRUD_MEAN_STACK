// Metodos y rutas 

'use strict'

var validator = require('validator'); 
var Article = require('../models/article');

var controller = {

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
                status: 'error',
                mensaje: 'Faltan dattos !'
            });
        
        }

        if(validate_title && validate_content) {
            // Crear el objeto a guardar
            var article = new Article(); // Modelo

            // Asignar valores 
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            // Guardar el article en la base de datos
            article.save((err, articleStored) => {

                if(err || !articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        mensaje: 'El articulo no se ha guardato !'
                    });
                }

                // DEvolvar respuesta           
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });
    
            });

            
        } else {
            return res.status(200).send({
                status: 'error',
                mensaje: 'Los datos no son validos'
            });
        }
    }
}; //End controller


module.exports = controller;