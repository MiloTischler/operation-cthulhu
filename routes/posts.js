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
             //console.log(posts);
         });
     });

     // Write a new post
     app.get('/posts/create', utils.requiresAdmin(models), function(req, res) {
         var Post = models.posts;

         res.render('post/create.jade', {
             title: 'New Post',
             post: new Post()
         });
     });

     app.post('/posts/create', utils.requiresAdmin(models), function(req, res) {
         var Post = models.posts;

         var post = new Post();

         post.title = req.param('title');
         post.body = req.param('body');
         post.user = req.session.currentUser._id;

         post.save(function(err) {
             if (err) {
                 utils.mongooseErrorHandler(err, req);

                 res.render('post/create.jade', {
                     title: 'New Post',
                     post: post
                 });
             } else {
                 console.log('Saved post: ' + post);

                 req.flash('notice', 'Saved successfully');
                 res.redirect('/posts');
             }
         });
     });


     // Admin posts
     app.get('/posts/admin', utils.requiresAdmin(models), function(req, res) {
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
     app.get('/posts/:postid', utils.requiresUser, function(req, res) {
         console.log('LOL:' + req.comments);
         
         res.render('post/view.jade', {
             title: 'Blog entry',
             post: req.post,
             comments: req.comments
         });
     });

     // Update a post
     app.get('/posts/edit/:postid', utils.requiresAdmin(models), function(req, res) {
         res.render('post/edit.jade', {
             title: 'Update Post: ' + req.post.title,
             post: req.post,
             comments: req.comments
         });
     })

     app.put('/posts/edit/:postid', utils.requiresAdmin(models), function(req, res) {
         var post = req.post;

         post.title = req.param('title');
         post.body = req.param('body');
         post.user = req.session.currentUser._id;

         post.save(function(err) {
             if (err) {
                 utils.mongooseErrorHandler(err, req);

                 res.render('post/edit.jade', {
                     title: 'Update Post: ' + req.post.title,
                     post: post
                 });
             } else {
                 console.log('Updated post: ' + post);

                 req.flash('notice', 'Edited successfully');
                 res.redirect('/posts/' + post._id);
             }
         });

     });

     // Delete a post
     app.get('/posts/delete/:postid', utils.requiresAdmin(models), function(req, res) {
         var post = req.post;
         post.remove(function(err) {
             req.flash('notice', 'Deleted successfully');
             res.redirect('/posts/admin');
         });
     });

     // Middleware for postid param
     app.param('postid', function(req, res, next, id) {
         var Post = models.posts;

         Post.findOne({
             _id: req.params.postid
         }).populate('user').run(function(err, post) {
             if (err) return next(err);
             if (!post) return next(new Error('Failed to load post ' + postid));

             req.post = post;

             var Comment = models.comments;

             Comment.find({
                 post: req.post
             }).populate('user').run(function(err, comments) {
                 if (err) throw err;
                 req.comments = comments;
                 next();
             });
         });
     });
 }