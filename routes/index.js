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

    // Write a new post
    app.get('/posts/new', function(req, res) {
        res.render('blog_new.jade', {title: 'New Post'});
    })

    app.post('/posts/new', function(req, res) {
        var Post = models.posts;

        var post = new Post();
        post.title = req.param('title');
        post.body = req.param('body');

        post.save(function(err) {
            if(err) throw err;

            console.log('Saved post..');
        })

        res.redirect('/posts');
    });

    // View a single post
    app.get('/posts/:id', function(req, res) {
        var Post = models.posts;

        Post.findOne({_id : req.params.id}, function(err, post) {
            if(err) throw err;

            console.log('View post: ' + post);

            res.render('article.jade', {title : 'Blog entry', post : post})
        });
    });

    // Update a post
    app.get('/posts/:id/edit', function(req, res) {
        var Post = models.posts;


        Post.findOne({_id : req.params.id}, function(err, post) {
            if(err) throw err;

            console.log('update post: ' + post);

            res.render('blog_update.jade', {title: 'Update Post: ' + post.title, post : post});
        });
    })

    app.put('/posts/:id/edit', function(req, res) {
        console.log("HMM: " + req.post);
    });

    // Middleware for id param
    app.param('id', function(req, res, next, id) {
        var Post = models.posts;
        Post.findOne({_id : req.params.id}).run(function(err, post) {
            if(err) return next(err);
            if(!post) return next(new Error('Failed to load post ' + id));

            req.post = post;

            next();
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
        res.render('userList.jade', {
            title: 'Userlist',
            user1: 'Milo',
            user2: 'Paul',
            user3: 'Jakob'
        });
    });


}