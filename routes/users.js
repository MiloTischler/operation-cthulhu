module.exports = function(app, models) {

    // Display user list
    app.get('/users/list', utils.requiresUser, function(req, res) {

        var User = models.users;

        User.find({}).asc('name').run(function(err, users) {
            if (err) throw err;

            res.render('user/list.jade', {

                title: 'Userlist',
                users: users
            });
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
        user.remove(function(err) {
            req.flash('notice', 'Deleted successfully');
            res.redirect('/user/list');
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
          //  req.flash('info', 'User successfully removed');
            res.redirect('/user/list');
        });
       // req.flash('info', 'User successfully removed');
    });


}