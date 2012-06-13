module.exports = function(app, models) {

    // load userlist page
    app.get('/userList', utils.requiresUser, function(req, res) {

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
    app.post('/userList', utils.requiresUser, function(req, res) {

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
    app.get('/user/edit/:userid', utils.requiresUser, function(req, res) {
        res.render('user/edit.jade', {
            title: 'Update User: ' + req.user.name,
            user: req.user
        });
    });

    // edit a user
    app.put('/user/edit/:userid', utils.requiresUser, function(req, res) {
        var user = req.user

        user.name = req.param('UserName', null);
        user.password = req.param('password', null);
        // change user in db
        user.save(function(err, user) {
             if (err) throw err;
             console.log('Updated User: ' + user);
             res.redirect('/userList');
         });
    });

    // Middleware for id param
    app.param('userid', function(req, res, next, id) {
        var User = models.users;
        User.findOne({
            _id: req.params.userid
        }).run(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + userid));


            req.user = user;

            next();
        });
    });

    // Delete a user
    app.get('/users/delete/:userid', utils.requiresUser, function(req, res) {
        var user = req.user;
        user.remove(function(err) {
            res.redirect('/userList');
        });
    });

}