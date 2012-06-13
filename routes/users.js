module.exports = function(app, models) {

    // Display user list
    app.get('/users/list', utils.requiresUser, function(req, res) {

        var User = models.users;
        var isAdmin = 'admin';
        

        User.find({}).asc('name').run(function(err, users) {
            if (err) throw err;

            if (req.session.currentUser.role != isAdmin)
            {
                res.render('user/list.jade', {

                    title: 'Userlist',
                    users: users,
                    locals: { user: req.user}
                });
            } 
            else
            {
                res.render('user/adminlist.jade', {

                    title: 'Userlist',
                    users: users,
                    locals: { user: req.user}
                });  
            }
        });
    });

    // Update a user
    app.get('/users/edit/:userid', utils.requiresUser, function(req, res) {
        res.render('user/edit.jade', {
            title: 'Update User: ' + req.user.name,
            user: req.user
        });
    });

    app.put('/users/edit/:userid', utils.requiresUser, function(req, res) {
        var user = req.user

        user.name = req.param('UserName');
        user.password = req.param('password', null);
        // change user in db
        user.save(function(err, user) {
            if (err) {
                utils.mongooseErrorHandler(err, req);

                res.render('user/edit.jade', {
                    title: 'Update User: ' + user.name,
                    user: user
                });
            } else {
                console.log('Updated User: ' + user);

                req.flash('notice', 'Edited successfully');
                res.redirect('/users/list');
            }
        });
    });


    // Delete a user
    app.get('/users/delete/:userid', utils.requiresUser, function(req, res) {
        var user = req.user;
        var deletedUser = req.user.name;

        user.remove(function(err) {
            req.flash('notice', 'Deleted ' + deletedUser + ' successfully');
            res.redirect('/users/list');
        });
    });

    //view single user
    app.get('/users/show/:userid', utils.requiresUser, function(req, res) {
        res.render('user/single.jade', {
            title: 'Update User: ' + req.user.name,
            user: req.user
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

    app.get('/users/admin', utils.requiresAdmin(models), function(req, res) {
        res.render('user/admin.jade', {
            title: 'Admin Panel: '
        });
    });

}