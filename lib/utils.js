exports.mongooseErrorHandler = function(err, req) {
    var errors = err.errors;
    for (var error in errors) {
        var field = errors[error].path.charAt(0).toUpperCase() + errors[error].path.slice(1);
        req.flash('error', field + ': ' + errors[error].type);
    }
}

exports.requiresLogin = function(req, res, next) {

    var url = require("url");
    if (req.session.loggedIn == true && req.session.currentUser != null) next();
    else {
        req.flash('info', 'You need to be logged in.');
        req.session.redirectAfterLogin = url.parse(req.url).pathname;
        res.redirect('/login');
    }
}