'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

// Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/api_rest', { useNewUrlParser: true, useUnifiedTopology:true })
        .then(() => {
            // Crear servidor para peticiones HTTP
            app.listen(port, () => {
                console.log(`Server listen to hpttp://localhost: ${port}`);
            });
        
        });
