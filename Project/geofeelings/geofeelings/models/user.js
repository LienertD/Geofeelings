/**
 * Created by Lienert on 25/11/2015.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
    username: String,
    password: String,
    email: String,
    gender: String,
    address: String
});