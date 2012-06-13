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

        var User = models.users;

        User.findOne({_id: loginName}).run(function(err, users) {
            if (err) throw err;
            console.log('found user:');
        });

            //check if login is correct
       

        console.log("user: " + loginName + " pw: " + password);
    });
}