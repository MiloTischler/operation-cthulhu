module.exports = function(app, models) {

    // Redirect to posts
    app.get('/', function(req, res) {
        res.redirect('/posts');
    });
}