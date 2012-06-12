
var express = require('express');
var ArticleProvider = require('./articleprovider-mongodb').ArticleProvider;

var app = module.exports = express.createServer();

app.mongoose = require('mongoose');


var app = module.exports = express.createServer();




var models = {};



models.posts = require('./models/post')(app.mongoose).model;


require('./routes')(app, models);


app.post('/addComment', function(req, res) {
    articleProvider.addCommentToArticle(req.param('_id'), {
        person: req.param('person'),
        comment: req.param('comment'),
        created_at: new Date()
       } , function( error, docs) {
           res.redirect('/blog/' + req.param('_id'))
       });
});



console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
