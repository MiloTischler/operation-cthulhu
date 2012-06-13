 module.exports = function(app, models) {

    // Load all posts
    app.get('/posts', function(req, res) {
        var Post = models.posts;

        Post.find({}).desc('date').run(function(err, posts) {
            if (err) throw err;

            res.render('index.jade', {
                title: 'Posts',
                posts: posts
            });

            console.log('Loaded posts:');
            console.log(posts);
            console.log('NICE');
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
    app.get('/posts/:postid', function(req, res) {
        var Post = models.posts;

        res.render('article.jade', {title : 'Blog entry', post : req.post})
    });

    // Update a post
    app.get('/posts/:postid/edit', function(req, res) {
        var Post = models.posts;

        res.render('blog_update.jade', {title: 'Update Post: ' + post.title, post : req.post});
    })

    app.put('/posts/:postid/edit', function(req, res) {
        console.log("HMM: " + req.post);
    });

    // Middleware for id param
    app.param('postid', function(req, res, next, id) {
        var Post = models.posts;
        Post.findOne({_id : req.params.postid}).run(function(err, post) {
            if(err) return next(err);
            if(!post) return next(new Error('Failed to load post ' + postid));

            req.post = post;

            next();
        });
    });
}