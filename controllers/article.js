// Metodos y rutas 

'use strict'

const { query } = require('express');
var validator = require('validator'); 
var Article = require('../models/article');
const { param } = require('../routes/article');
var fs = require('fs');
var path = require('path');
const article = require('../models/article');
const { exists } = require('../models/article');

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

                // Devolvar respuesta           
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
    },

    // Metodo cargar los archivos de la base de datos
    getArticles: (req, res) => {

        var query = Article.find({});

        // Ultimos 5 resultados
        var last = req.params.last;

        if(last || last != undefined) {
            query.limit(5);
        }

        // Extraer datos con Find 
        query.sort('-_id').exec((err, articles) => {
            
            if(err) {
                return res.status(500).send({
                    status: 'error',
                    mensaje: 'Error al devolver los articulos'
                });
            }

            if(!articles) {
                return res.status(404).send({
                    status: 'error',
                    mensaje: 'No hay articulos para mostrar'
                });
            }

            return res.status(200).send({
                status: 'succes',
                articles
            
            });
        });

    },

    getArticle: (req, res) => {

        // Recoger el id ede la url
        var articleId = req.params.id; 

        // Comprobar que existe
        if(!articleId || articleId == null) {

            return res.status(404).send({
                status: 'error',
                mensaje: 'No existe el articulo'
            });

        }

        // Buscar el articulo
        Article.findById(articleId, (err, article) => {

            if(err || !article) {
                return res.status(404).send({
                    status: 'error',
                    mensaje: 'No existe el articulo !'
                });
            }
            
            // Devolverlo en json
            return res.status(200).send({
                status: 'succes',
                article
            
            });

        })  
    },

    // Metodo para editar/actualizar articulo
    upDate: (req, res) => {

        // Recoger el id del articulo por la url
        var articleId = req.params.id;

        // Recoger los datos que llegan por put
        var params = req.body;

        // Validar datos
        try {

            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        } catch (error) {

            return res.status(200).send({
                status: 'error',
                mensaje: 'Faltan datos por enviar !'
            });

        }

        if( validate_title && validate_content ) {
            
            // Find and update
            // findOneAndUpdate(id del articulo antiguo, parametros del update, devuelve articulo actualizado)
            Article.findOneAndUpdate({_id: articleId}, params, {new: true}, 
            (err, articleUpdate) => {

                if(err) {
                    return res.status(500).send({
                        status: 'error',
                        mensaje: 'Error al actualizar !'
                    });
                }
                
                if(!articleUpdate) {
                    return res.status(404).send({
                        status: 'error',
                        mensaje: 'No existe el articulo !'
                    });
                }

                // Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    article: articleUpdate
                
                });
               
            });

        } else {
            return res.status(200).send({
                status: 'error',
                mensaje: 'La validacion no es correcta !'
            
            });
        }

    },

    delete: (req, res) => {

        // Recoger el ID de la URL
        var articleId = req.params.id;

        // Find and delete
        Article.findOneAndDelete({_id: articleId}, (err, articleRemove) => {
            
            if(err) {
                return res.status(500).send({
                    status: 'error',
                    mensaje: 'Error al borrar'
                });
            }

            if(!articleRemove) {
                return res.status(404).send({
                    status: 'error',
                    mensaje: 'No se a podido borrar el articulo !'
                });
            }
            
            return res.status(200).send({
                status: 'succes',
                article: articleRemove
            })
        
        });
    },

    upload: (req, res) => {
        // Configurar el modulo connect multiparty router/article.js
        // Recoger el fichero de la peticion
        var file_name = 'Imagen no subida';

        if(!req.files){
            return res.status(404).send({
                status: 'error',
                mensaje: file_name
            })
        }

        // Conseguir nombre y la extension del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        // *advertencia linux o mac '/' *
        
        // Nombre del archivo
        var file_name = file_split[2];

        // Extension del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1]; 

        // Comprobar la extension 
        if(file_ext !== 'jpg' && file_ext !== 'png'  && file_ext !== 'jpeg'  && file_ext !== 'gif' ) {

            // Borrar el archivo subido si no se cumple con la extension
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    mensaje: 'La extension de la imagen no es valida'
                })
            })
        } else {

            // Buscar el articulo, asignar la imagen y actualizar
            var articleId = req.params.id;
            article.findOneAndUpdate({_id: articleId}, {image: file_name}, {new:true}, (err, articleUpdated) => {
                
                if(err || !articleUpdated) {
                    return res.status(200).send({
                        status: 'error',
                        mensaje: 'Error al guardar imagen'
                    })
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                })
            
            })


            
        }
        
    },

    // Sacar imagen

    getImage: (req, res) => {

        // Sacar fichero
        var file = req.params.image;

        var path_file = './upload/articles/'+file;

        fs.exists(path_file,(exists) => { // comprobamos si el fichero existe 
            if(exists) {
                
                // resuelve la ruta con path.resolve
                return res.sendFile(path.resolve(path_file)); 

            } else {

                return res.status(200).send({
                    status: 'error',
                    mensaje: 'La imagen no existe !'
                });

            }
        });
    }

}; //End controller


module.exports = controller;