module.exports = function(app, models) {
    // load registration page
    app.get('/register', function(req, res) {
        res.render('user/register.jade', {
            title: 'Registration'
        });
    });

    // registration handler
    app.post('register', function(req, res) {

        var loginName = req.param('loginName', null);
        var password = req.param('password', null);
        var passwordRepeat = req.param('passwordRepeat', null);
        var roles = req.param('roles', null);
        var role = roles.role;

        if (password != passwordRepeat) {
            console.log("Flash should appear!");
            req.flash('info', 'Passwords must be the same!');
            res.redirect('/register');
        }

        var User = models.users;
        var registeredUser = new User();
        registeredUser.name = loginName;
        registeredUser.password = password;
        registeredUser.role = role;

        // save user in db
        registeredUser.save(function(err, user) {
            console.log(err);
            if (err) {
                if (err.code == 11000) {
                    req.flash('info', 'Username already taken!');
                    res.redirect('/register');
                }
            } else {
                req.flash('info', 'Registration successful!');
                res.redirect('/register');
            }
        });
    });


// registration handler
    app.post('registerAdmin', function(req, res) {

        var loginName = req.param('loginName', null);
        var password = req.param('password', null);
        var passwordRepeat = req.param('passwordRepeat', null);
        var roles = req.param('roles', null);
        var role = roles.role;

        if (password != passwordRepeat) {
            console.log("Flash should appear!");
            req.flash('info', 'Passwords must be the same!');
            res.redirect('/register');
        }

        var User = models.users;
        var registeredUser = new User();
        registeredUser.name = loginName;
        registeredUser.password = password;
        registeredUser.role = role;

        // save user in db
        registeredUser.save(function(err, user) {
            console.log(err);
            if (err) {
                if (err.code == 11000) {
                    req.flash('info', 'Username already taken!');
                    res.redirect('/register');
                }
            } else {
                req.flash('info', 'Registration successful!');
                res.redirect('/register');
            }
        });
    });
}