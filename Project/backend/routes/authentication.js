/**
 * Created by Jonatan on 13/12/2015.
 */

module.exports = function(app, passport) {
    // Loader
    app.get('/', function (req, res) {
        res.sendFile('./public/index.html');

    });

    // Logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.json({ redirect : '/logout' });
    });

    // Login
    app.post('/login', function(req, res) {
        if (!req.body.username || !req.body.password) {
            return res.json({ error: 'All fields are required' });
        }

        passport.authenticate('login', function (err, user) {
            if (err) {
                return res.json(err);
            }

            if (user.error) {
                return res.json({ error : user.error });
            }

            req.logIn(user, function(err) {
                if(err) {
                    return res.json(err);
                }

                return res.json({ redirect : '/user' });
            });
        })(req, res);
    });

    // Register
    app.post('/register', function(req, res) {
        if (!req.body.username || !req.body.email || !req.body.password) {
            return res.json({ error: 'All fields are required' });
        }
        passport.authenticate('register', function(err, user) {
            if (err) {
                return res.json(err);
            }

            if (user.error) {
                return res.json({ error: user.error });
            }

            req.logIn(user, function(err) {
                if (err) {
                    return res.json(err);
                }

                return res.json({ redirect: '/user' });
            });
        })(req, res);
    });

    app.get('/user', isLoggedIn, function(req, res) {
        return res.json(req.user);
    });
};

// User logged in
function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.json({ redirect : '/login' });
    } else {
        next();
    }
}