'use strict'

const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/api_rest', { useNewUrlParser: true, useUnifiedTopology:true })
        .then(() => {console.log('ok2'); });