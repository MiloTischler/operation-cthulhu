module.exports = function(app, models) {
    
    app.get('/', function(req, res) {
        var Post = models.posts;
        
        var post = new Post();
        post.title = 'lol';
        post.body = 'body';
        post.save(function(err) {
            if(err) throw err;

            console.log('Post saved..');
        });

        Post.find({}, function(err, posts) {
            if(err) throw err;

            console.log('Loaded posts:');
            console.log(posts);
        });

        res.send('okay..');
    });
}