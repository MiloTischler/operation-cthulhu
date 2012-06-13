module.exports = function(app, models) {

    // Redirect to posts
    app.get('/', function(req, res) {
        res.redirect('/posts');
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