module.exports = function(app, express, mongoose) {
    var config = this;

    app.configure(function(){
      app.set('views', __dirname + '/views');
      app.set('view engine', 'jade');
      app.use(express.bodyParser());
      app.use(express.methodOverride());
      app.use(require('stylus').middleware({ src: __dirname + '/public' }));
      app.use(app.router);
      app.use(express.static(__dirname + '/public'));
      app.use(express.cookieParser());
      app.use(express.session({ secret: "keyboard cat" }));
      app.dynamicHelpers({ messages: require('express-messages') });
    });

    app.configure('development', function(){
      app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
    });

    app.configure('production', function(){
      app.use(express.errorHandler()); 
    });

    app.mongoose.connect('mongodb://localhost:27017/blog');
}