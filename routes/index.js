module.exports = function(app, models) {

    // Redirect to posts
    app.get('/', function(req, res) {
        res.redirect('/posts');
    });
    
    // Load all posts
    app.get('/posts', function(req, res) {
        var Post = models.posts;

        Post.find({}).desc('date').run(function(err, posts) {
            if(err) throw err;

            res.render('index.jade', {title : 'Posts', posts : posts});

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
}