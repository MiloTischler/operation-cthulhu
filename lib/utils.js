exports.mongooseErrorHandler = function(err, req) {
    var errors = err.errors;
    for (var error in errors) {
        var field = errors[error].path.charAt(0).toUpperCase() + errors[error].path.slice(1);
        req.flash('error', field + ': ' + errors[error].type);
    }
}

exports.requiresAdmin = function(models) {
    return function(req, res, next) {

        // if no admins are added to the db, disable admin permission
        var User = models.users;

        User.findOne({
            role: "admin"
        }).run(function(err, adminExists) {
            if (err) throw err;
            if (!adminExists) {
                console.log("You may pass..");
                req.session.noAdmin = true;
                next();
            } else {
                var url = require("url");
                if (req.session.loggedIn == true && req.session.currentUser != null) {
                    if (req.session.currentUser.role == "admin") next();
                    else {
                        req.flash('info', 'You are not authorized to do this. Try to log in with according rights.');
                        res.redirect('/users/login')
                    };
                } else {
                    req.flash('info', 'You need to be logged in.');
                    req.session.redirectAfterLogin = url.parse(req.url).pathname;
                    res.redirect('/users/login');
                }
            }
        });

    }
}

exports.requiresUser = function(req, res, next) {

    var url = require("url");
    if (req.session.loggedIn == true && req.session.currentUser != null && (req.session.currentUser.role == "admin" || req.session.currentUser.role == "user")) next();
    else {
        req.flash('info', 'You need to be logged in.');
        req.session.redirectAfterLogin = url.parse(req.url).pathname;
        res.redirect('/users/login');
    }
}