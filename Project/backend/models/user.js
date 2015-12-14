/**
 * Created by Jonatan on 13/12/2015.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT = 8;
var userSchema = mongoose.Schema({
    username : String,
    email : String,
    password : String,
    age : Date,
    lat : Number,
    lng : Number
});

userSchema.methods.generateHash = function (password, cb) {
    bcrypt.hash(password, SALT, function(err, hash) {
        if (err) {
            return cb(err);
        }
        return cb(err, hash);
    });
};

userSchema.methods.validPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        return cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);