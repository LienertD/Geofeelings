/**
 * Created by Jonatan on 13/12/2015.
 */

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function (passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // login
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        User.findOne({ 'email' : email }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong email.'));
            } else {
                user.validPassword(password, function (err, isMatch) {
                    if (err) {
                        throw err;
                    }

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }
                });
            }
        });
    }));

    // register
    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        process.nextTick(function () {
            User.findOne({'email': email}, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, false, req.flash('registerMessage', 'Email already taken.'));
                } else {
                    var newUser = new User();
                    newUser.generateHash(password, function (err, hash) {
                        if (err) {
                            throw err;
                        }

                        newUser.email = email;
                        newUser.username = req.body.username;
                        newUser.password = hash;
                        newUser.save(function (err) {
                            if (err) {
                                throw err;
                            }

                            return done(null, newUser);
                        });
                    });
                }
            });
        });
    }));
};