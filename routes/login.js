module.exports = function(app, models) {
    // load login page
    app.get('/login', function(req, res) {
        res.render('user/login.jade', {
            locals: { user: req.user, title: 'Login' }
            
        });
    });
    



    // login handler
    app.post('/login', function(req, res) {
        var loginName = req.param('loginName', null);
        var password = req.param('password', null);

        console.log("user: " + loginName + " pw: " + password);

        var User = models.users;

        User.findOne({
            name: loginName
        }).run(function(err, user) {

            if (err) console.log("Login failed.");
            if (!user) {
                console.log("Username incorrect!")
                req.flash('info', 'Login incorrect!');
                res.redirect('/login');
            } else if (user.password == password) {
                console.log("Login correct!")
                req.session.loggedIn = true;
                req.session.currentUser = user;
                req.flash('info', 'LogIn successful');

                // if someone tried to call a login protected function and has logged in afterwards
                // redirect him to the former requested url
                if (req.session.redirectAfterLogin != null) {
                    var redirectTo = req.session.redirectAfterLogin;
                    req.session.redirectAfterLogin = null;
                    res.redirect(redirectTo);
                } else res.redirect('/');

            } else {

                console.log("Login incorrect");
                req.flash('info', 'Login incorrect!');
                res.redirect('/login');

            };
        });
    });

    // log out
    app.get('/logout', function(req, res) {

        // delete session data
        req.session.loggedIn = false;
        req.session.user = null;

        // redirect to home
        req.flash('info', 'Logout successful!');
        res.redirect('/');
    });

}