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

            res.render('index.jade', {title : 'Posts', articles : posts});

            console.log('Loaded posts:');
            console.log(posts);
        });
    });
}