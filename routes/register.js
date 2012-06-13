module.exports = function(app, models) {
    // load registration page
    app.get('/users/register', function(req, res) {
        res.render('user/register.jade', {
            title: 'Registration'
        });
    });

    // registration handler
    app.post('/users/register', function(req, res) {

        var loginName = req.param('loginName', null);
        var password = req.param('password', null);
        var passwordRepeat = req.param('passwordRepeat', null);
        var role = "user";

        if (password != passwordRepeat) {
            console.log("Flash should appear!");
            req.flash('info', 'Passwords must be the same!');
            res.redirect('/users/register');

        } else {

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
                        res.redirect('/users/register');
                    }
                } else {
                    req.flash('info', 'Registration successful!');
                    res.redirect('/users/register');
                }
            });
        }
    });

    // registration handler
    app.post('/users/register/admin', utils.requiresAdmin(models), function(req, res) {
        console.log("trying my best");

        var loginName = req.param('loginName', null);
        var password = req.param('password', null);
        var passwordRepeat = req.param('passwordRepeat', null);
        var roles = req.param('roles', null);
        var role = roles.role;

        if (password != passwordRepeat) {
            console.log("Flash should appear!");
            req.flash('info', 'Passwords must be the same!');
            res.redirect('/users/register');

        } else {
            
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
                        res.redirect('/users/admin');
                    }
                } else {
                    req.flash('info', 'Registration successful!');
                    res.redirect('/users/admin');
                }
            });
        }

    });
}