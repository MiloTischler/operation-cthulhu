module.exports = function(app, models) {


   // load userlist page
    app.get('/userList', function(req, res) {
        
        var User = models.users;

        User.find({}).asc('name').run(function(err, users) {
            if (err) throw err;

            res.render('userList.jade', {
                title: 'schweigi',
                users: users

            });
            console.log('user:');
        });
         console.log('user:2');
    });

    // handle userlist page
    app.post('/userList', function(req, res) {

        var User = models.user;
   
        User.find({}).desc('loginName').run(function(err, user) {
            if (err) throw err;

            res.render('userlist.jade', {
                title: 'Userlist',
                users: users
            });

            console.log('Loaded Users:');
            console.log(users);
        });
    });

}