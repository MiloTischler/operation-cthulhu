 module.exports = function(app, models) {
     // Load all posts
     app.get('/posts', function(req, res) {
         var Post = models.posts;

         Post.find({}).desc('date').run(function(err, posts) {
             if (err) throw err;

             res.render('post/list.jade', {
                 title: 'Posts',
                 posts: posts
             });

             console.log('Loaded posts:');
             console.log(posts);
         });
     });

     // Write a new post
     app.get('/posts/new', function(req, res) {
         res.render('post/create.jade', {
             title: 'New Post'
         });
     });

     app.post('/posts/new', function(req, res) {
         var Post = models.posts;

         var post = new Post();

         post.title = req.param('title');
         post.body = req.param('body');

         post.save(function(err, post) {
             if (err) throw err;

             console.log('Saved post: ' + post);

             res.redirect('/posts');
         });
     });


     // Admin posts
     app.get('/posts/admin', function(req, res) {
         var Post = models.posts;

         Post.find({}).desc('date').run(function(err, posts) {
             if (err) throw err;

             res.render('post/admin.jade', {
                 title: 'Admin Posts',
                 posts: posts
             });

             console.log('Loaded posts:');
             console.log(posts);
         });
     });

     // View a single post
     app.get('/posts/:postid', function(req, res) {
         res.render('post/view.jade', {
             title: 'Blog entry',
             post: req.post,
             comments: req.comments
         });
     });

     // Update a post
     app.get('/posts/edit/:postid', function(req, res) {
         res.render('post/edit.jade', {
             title: 'Update Post: ' + req.post.title,
             post: req.post
         });
     })

     app.put('/posts/edit/:postid', function(req, res) {
         var post = req.post;

         post.title = req.param('title');
         post.body = req.param('body');

         post.save(function(err, post) {
             if (err) throw err;

             console.log('Updated post: ' + post);

             res.redirect('/posts/' + post._id);
         });

     });

     // Delete a post
     app.get('/posts/delete/:postid', function(req, res) {
         var post = req.post;
         post.remove(function(err) {
             res.redirect('/posts/admin');
         });
     });

     // Middleware for postid param
     app.param('postid', function(req, res, next, id) {
         var Post = models.posts;

         Post.findOne({
             _id: req.params.postid
         })
         .populate('user')
         .run(function(err, post) {
             if (err) return next(err);
             if (!post) return next(new Error('Failed to load post ' + postid));

             req.post = post;

             var Comment = models.comments;

             Comment.find({post : req.post})
             .run(function(err, comments) {
                if(err) throw err;
                req.comments = comments;
                next();
             });
         });
     });
 }