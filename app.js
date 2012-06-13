var express = require('express');

var app = module.exports = express.createServer();

app.mongoose = require('mongoose');

var config = require('./config.js')(app, express);


var models = {};


models.posts = require('./models/post')(app.mongoose).model;
models.users = require('./models/user')(app.mongoose).model;


require('./routes/index.js')(app, models);
require('./routes/posts.js')(app, models);
require('./routes/register.js')(app, models);
require('./routes/users.js')(app, models);
require('./routes/login.js')(app, models);

app.listen(process.env.PORT || 8888);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);