module.exports = function(app, models) {

    // Redirect to posts
    app.get('/', function(req, res) {
        res.redirect('/posts');
    });


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

    // load registration page
    app.get('/register', function(req, res) {
        res.render('register.jade', {
            title: 'Registration'
        });
    });

    // registration handler
    app.post('/register', function(req, res) {

        var loginName = req.param('loginName', null);
        var password = req.param('password', null);
        var passwordRepeat = req.param('passwordRepeat', null);

        if (password != passwordRepeat) {
            console.log("Flash should appear!");
            req.flash('info', 'Passwords must be the same!');
            res.redirect('/register');
        }

        var User = models.users;
        var registeredUser = new User();
        registeredUser.name = loginName;
        registeredUser.password = password;

        // now kiss
        console.log("user: " + loginName + " pw: " + password + " pwr: " + passwordRepeat);
    });


    // load userlist page
    app.get('/userList', function(req, res) {
        
        var User = models.users;
        res.render('userList.jade', {
            title: 'Userlist',
            users: users
        });
    });

    // handle userlist page
    app.post('/userList', function(req, res) {

        var User = models.user;
   
        User.find({}).desc('username').run(function(err, user) {
            if (err) throw err;

            res.render('userlist.jade', {
                title: 'Userlist',
                user: user
            });

            console.log('Loaded Users:');
            console.log(user);
        });
    });


}