/**
 * Created by Jonatan on 13/12/2015.
 */

module.exports = function(app, passport) {

    // Logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    // Login
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message : req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('login', {
        successRedirect : '/user',
        failureRedirect : '/login',
        failureFlash : true
    }));

    // Register
    app.get('/register', function(req, res) {
        res.render('register.ejs', { message : req.flash('registerMessage') });
    });

    app.post('/register', passport.authenticate('register', {
        successRedirect : '/user',
        failureRedirect : '/register',
        failureFlash : true
    }));

    // User
    app.get('/user', isLoggedIn, function (req, res) {
        res.render('user.ejs', { user : req.user });
    });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}