module.exports = function(app, models) {
    // load login page
    app.get('/login', function(req, res) {
        res.render('user/login.jade', {
            title: 'Login'
        });
    });

    // login handler
    app.post('/login', function(req, res) {
        var loginName = req.param('loginName', null);
        var password = req.param('password', null);

        var User = models.users;
        User.findOne({
            name: loginName
        }).run(function(err, user) {
            if (err) console.log("Login failed.");
            if (!user) console.log("Username incorrect!");
            if (user.password = password) console.log("Login correct!");
        });



        console.log("user: " + loginName + " pw: " + password);
    });
}