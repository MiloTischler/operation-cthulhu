module.exports = function(app, express, mongoose) {
    var config = this;

    app.configure(function(){
      app.set('views', __dirname + '/views');
      app.set('view engine', 'jade');
      app.use(express.bodyParser());
      app.use(express.methodOverride());
      app.use(require('stylus').middleware({ src: __dirname + '/public' }));
      app.use(express.cookieParser());
      app.use(express.session({ secret: 'mongoblog' }));
      app.use(app.router);
      app.use(express.static(__dirname + '/public'));
    });

    app.configure('development', function(){
      app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
    });

    app.dynamicHelpers({
      
      request: function(req){
        return req
      },

      hasMessages: function(req){
        if (!req.session) return false
        return Object.keys(req.session.flash || {}).length
      },

      // flash messages
        messages: require('express-messages')
    });

    app.configure('production', function(){
      app.use(express.errorHandler()); 
    });

    app.mongoose.connect('mongodb://localhost:27017/blog');
}