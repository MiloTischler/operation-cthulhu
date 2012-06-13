module.exports = function(app, models) {

    // Write a new comment
    app.post('/comments/create/:postid', utils.requiresUser, function(req, res) {
        var Comment = models.comments;

        var comment = new Comment();
        comment.post = req.post._id;
        comment.title = req.param('comment_title');
        comment.body = req.param('comment_body');
        comment.user = req.session.currentUser._id;

        comment.save(function(err) {
            if (err) {
                utils.mongooseErrorHandler(err, req);
            }

            res.redirect('/posts/show/' + req.post._id);
        })
    });

    // Delete a comment
    app.get('/comments/delete/:commentid', utils.requiresAdmin(models), function(req, res) {
        var comment = req.comment;

        comment.remove(function(err) {
            req.flash('notice', 'Deleted successfully');
            res.redirect('/posts/edit/' + comment.post._id);
        });
    });

    // Middleware for commentid param
    app.param('commentid', function(req, res, next, id) {
        var Comment = models.comments;

        Comment.findOne({
            _id: req.params.commentid
        }).populate('user').populate('post').run(function(err, comment) {
            if (err) return next(err);
            if (!comment) return next(new Error('Failed to load comment ' + commentid));

            req.comment = comment;

            next();
        });
    });
}