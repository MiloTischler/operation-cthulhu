module.exports = function(app, models) {
    app.post('/comments/:postid', function(req, res) {
        var Comment = models.comments;

        var comment = new Comment();
        comment.post = req.post._id;
        comment.title = req.param('comment_title');
        comment.body = req.param('comment_body');

        comment.save(function (err) {
            if(err) {
                utils.mongooseErrorHandler(err, req);
            } 
            
            res.redirect('/posts/' + req.post._id);
        })
    });
}