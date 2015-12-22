var express = require('express');
var app = express();
var port = process.env.PORT;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret : 'secretsession', resave : true, saveUninitialized : true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public/src/')));

require('./routes/auth.js')(app, passport);
require('./routes/api.js')(app);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

module.exports = app;
