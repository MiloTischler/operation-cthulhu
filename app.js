/**
 * Module dependencies.
 */


var express = require('express');

var app = module.exports = express.createServer();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 

});

var articleProvider = new ArticleProvider('localhost', 27017);
// Routes


app.get('/', function(req, res){
    articleProvider.findAll( function(error,docs){
        res.render('index.jade', { 
            locals: {
                title: 'BlogOmfg',
                articles:docs
            }
        });
    })
});

app.get('/new', function(req, res) {
    res.render('login.jade', { locals: {
        title: 'UserList:'
    }
    });
});


models.examples = require('./models/example')(app.mongoose).model;


app.get('/:id', function(req, res) {
    articleProvider.findById(req.params.id, function(error, article) {
        res.render('login.jade',
        { locals: {
            title: article.title,
            article:article
        }
        });
    });
});


app.listen(process.env.PORT || 8888);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

