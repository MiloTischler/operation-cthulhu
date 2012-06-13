module.exports = function(app, models) {

    // Redirect to posts
    app.get('/', function(req, res) {
        res.redirect('/posts');
    });

    // load userlist page
    app.get('/userList', function(req, res) {
        
       // var User = models.users;
        res.render('userList.jade', {
            title: 'Userlist'
        //    users: users
        });
    });

    // handle userlist page
    app.post('/userList', function(req, res) {

        var User = models.user;
   
        User.find({}).desc('username').run(function(err, user) {
            if (err) throw err;

            res.render('userlist.jade', {
                title: 'Userlist',
                user: user
            });

            console.log('Loaded Users:');
            console.log(user);
        });
    });
}