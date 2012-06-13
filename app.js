var express = require('express');
var fs = require('fs');

var app = module.exports = express.createServer();

app.mongoose = require('mongoose');

var config = require('./config.js')(app, express);


var models = {};

/*
models.posts = require('./models/post')(app.mongoose).model;
models.users = require('./models/user')(app.mongoose).model;
*/

// Bootstrap models
var models_path = __dirname + '/models';
var models_extension = '.js';
var models_files = fs.readdirSync(models_path);
models_files.forEach(function(file){
    models[file.replace(models_extension, '') + 's'] = require(models_path + '/' + file)(app.mongoose).model;
    console.log("boot model: " + file.replace(models_extension, '') + 's');
});

// Bootstrap routes
var routes_path = __dirname + '/routes';
var routes_files = fs.readdirSync(routes_path);
routes_files.forEach(function(file){
    require(routes_path + '/' + file)(app, models);
    console.log("boot route: " + file);
});

app.listen(process.env.PORT || 8888);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);