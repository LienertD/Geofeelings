var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');

var root = require('./routes/root.js');
var auth = require('./routes/auth.js');
var api = require('./routes/api.js');
var configDB = require('./config/database.js');
var server = require('./bin/www');
<<<<<<< HEAD
var io = require("socket.io").listen(3001);
var chat = require('./sockets/chat.js')(io);
=======
//var io = require('socket.io')(server);
//var chat = require('./sockets/chat.js')(io);
>>>>>>> origin/master

require('./sockets/chat.js');
require('./config/passport')(passport);
mongoose.connect(configDB.url);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/src/')));

app.use(session({ secret : 'supersecretsession' , resave : false, saveUninitialized : false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', root);
app.use('/auth', auth);
app.use('/api', api);


//[START CHAT] dit staat hier natuurlijk heel vuil tussen, later wordt dit in een aparte file gezet



/*var currentUsers = [];

io.sockets.on('connection', function (socket) {


    socket.on('logoutMessage', function (userid) {
        console.log("logout van user");

        for (var i = 0, len = currentUsers.length; i < len; i++) {
            if (currentUsers[i].currentUserId == userid) {
                currentUsers.splice(i, 1); //verwijderen van de currentusersarray
            }
        }

    });

    socket.on('loginMessage', function (userid) {
        console.log("login van user");

        if (userid !== undefined && userid !== null) { //bepalen als zender toegevoegd moet worden aan currentUsers (lijst van de users met hun socketid)
            var userIsAlreadyKnown = false;
            for (var i = 0, len = currentUsers.length; i < len; i++) {
                if (currentUsers[i].currentUserId == userid) {
                    userIsAlreadyKnown = true;

                    socketIdFromUserIsKnown = false;
                    for (var j = 0, silen = currentUsers[i].socketids.length; j < silen; j++) {
                        if (currentUsers[i].socketids[j] == socket.id) {
                            socketIdFromUserIsKnown = true; //socketid van userid reeds gekend, dus niet toevoegen aan lijst
                        }
                    }
                    if (!socketIdFromUserIsKnown) //socketid nog niet gekend, toeveogen aan lijst
                    {
                        currentUsers[i].socketids.push(socket.id);
                    }
                }
            }

            if (!userIsAlreadyKnown) { //toevogen aan gekendeusers als hij nog niet gekend is
                var arsocketids = []; //in een array steken want een userid kan op verschillende tabs/browsers chatten => meerdere socketids
                arsocketids.push(socket.id);
                var userIdObj = {
                    "currentUserId": userid,
                    "socketids": arsocketids
                };
                currentUsers.push(userIdObj);
            }
        }
    });

    socket.on('chatMessage', function (data) {
        console.log("chatmessage van user");
        var userIsKnown = false;
        for (i = 0, len = currentUsers.length; i < len; i++) {
            if (currentUsers[i].currentUserId == data.receiver) {
                userIsKnown = true;
                for (j = 0, silen = currentUsers[i].socketids.length; j < silen; j++) {
                    var receiverSocketId = currentUsers[i].socketids[j]; //sturen naar ELKE socketid van de ontvanger
                    socket.to(receiverSocketId).emit('chatMessage', data);
                }
            }
        }
        if (!userIsKnown) {
            console.log("user with id " + data.receiver + " is not known yet, message could not be send!");
        }
    });
});


//[EINDE CHAT]*/

module.exports = app;
