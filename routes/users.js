module.exports = function(app, models) {



   // load userlist page
    app.get('/userList', function(req, res) {
        
        var User = models.users;

        User.find({}).asc('name').run(function(err, users) {
            if (err) throw err;

            res.render('user/userList.jade', {
                title: 'Userlist',
                users: users
            });
        });
    });

    // handle userlist page
    app.post('/userList', function(req, res) {

        var User = models.user;

        User.find({}).desc('loginName').run(function(err, user) {

            if (err) throw err;

            res.render('user/userlist.jade', {
                title: 'Userlist',
                users: users
            });

            console.log('Loaded Users:');
            console.log(users);
        });
    });

    // edit a user
    app.get('/user/:userid/edit', function(req, res) {
        res.render('user/edit.jade', {
            title: 'Update User: ' + req.user.name,
            post: req.user
        });
    });

    // edit a user
    app.put('/user/:userid/edit', function(req, res) {
        res.redirect('/userList');
    });

    // Middleware for id param
    app.param('userid', function(req, res, next, id) {
        var User = models.users;
        User.findOne({
            _id: req.params.userid
        }).run(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load post ' + userid));

            req.user = user;

            next();
        });
    });

}