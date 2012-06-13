module.exports = function(app, models) {
    // load login page
    app.get('/login', function(req, res) {
        res.render('login.jade', {
            title: 'Login'
        });
    });

    // login handler
    app.post('/login', function(req, res) {
        var loginName = req.param('loginName', null);
        var password = req.param('password', null);

        console.log("user: " + loginName + " pw: " + password);
    });
}