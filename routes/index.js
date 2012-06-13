module.exports = function(app, models) {

    // Redirect to posts
    app.get('/', function(req, res) {
        res.redirect('/posts');
    });

    // Load all posts
    app.get('/posts', function(req, res) {
        var Post = models.posts;

        Post.find({}).desc('date').run(function(err, posts) {
            if (err) throw err;

            res.render('index.jade', {
                title: 'Posts',
                articles: posts
            });

            console.log('Loaded posts:');
            console.log(posts);
        });
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

        console.log("user: " + loginName + " pw: " + password + " pwr: " + passwordRepeat);
    });

    // load userlist page
    app.get('/userList', function(req, res) {
        res.render('userList.jade', {
            title: 'Userlist',
            user1: 'Milo',
            user2: 'Paul',
            user3: 'Jakob'
        });
    });



}