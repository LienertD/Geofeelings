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
//var io = require('socket.io')(server);
//var chat = require('./sockets/chat.js')(io);
//var chat = require('./sockets/chat.js');

require('./config/passport')(passport);
mongoose.connect(configDB.url);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/src/')));

app.use(session({secret: 'supersecretsession', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', root);
app.use('/auth', auth);
app.use('/api', api);


//[START CHAT] dit staat hier natuurlijk heel vuil tussen, later wordt dit in een aparte file gezet


var io = require("socket.io").listen(3001);
var currentUsers = [];

io.sockets.on('connection', function (socket) {

    socket.on('statusMessage', function (userid) {
        console.log("statusmsg ontvangen");
        if (userid !== undefined) { //bepalen als zender toegevoegd moet worden aan currentUsers (lijst van de users met hun socketid)
            var isAlreadyKnown = false;
            for (var i = 0, len = currentUsers.length; i < len; i++) {
                if (currentUsers[i].user == userid) {
                    isAlreadyKnown = true;
                }
            }

            if (!isAlreadyKnown) { //toevogen aan gekendeusers als hij nog niet gekend is
                var arsocketids = []; //in een array steken want een user kan op verschillende tabs/browsers chatten => meerdere socketids
                arsocketids.push(socket.id);
                var userIdObj = {
                    "user": userid,
                    "socketids": arsocketids
                };
                currentUsers.push(userIdObj);
                console.log(currentUsers);
            }
        }
    });

    socket.on('chatMessage', function (data) {
        console.log(data);

        if (data.sender !== undefined) { //bepalen als zender toegevoegd moet worden aan currentUsers (lijst van de users met hun socketid)
            var isAlreadyKnown = false;
            for (var i = 0, len = currentUsers.length - 1; i < len; i++) {
                console.log("CURRENT USERS:");
                console.log(currentUsers);
                console.log("i: " + i + ", currentUsers[i]" + currentUsers[i] + ", currentuser.length:" + currentUsers.length);
                if (currentUsers[i].user == data.sender) {
                    isAlreadyKnown = true;

                    var socketidAlreadyInCurrentUsers = false;

                    for (j = 0, len = currentUsers[i].socketids.length; j < len; j++) //als de huidige socketid nog niet in de socketids zet, hem er in plaatsen
                    {
                        if (currentUsers[i].socketids[j] == socket.id) {
                            socketidAlreadyInCurrentUsers = true;
                        }
                    }
                    if (!socketidAlreadyInCurrentUsers) {
                        currentUsers[i].socketids.push(socket.id);
                    }
                }
            }

            if (!isAlreadyKnown) { //toevoegen aan gekendeusers
                var asocketid = []; //in een array steken want een user kan op verschillende tabs/browsers chatten => meerdere socketids
                asocketid.push(socket.id);
                var userIdObj = {
                    "user": data.sender,
                    "socketids": asocketid
                };
                currentUsers.push(userIdObj);
                console.log(currentUsers);
            }
        }

        console.log("CURRENT USERS:");
        console.log(currentUsers);


        var userIsKnown = false;
        for (i = 0, len = currentUsers.length; i < len; i++) {
            if (currentUsers[i].user == data.receiver) {
                var receiverId = currentUsers[i].socketids[0];

                socket.to(receiverId).emit('chatMessage', data);
                break;
            }
        }
        if (!userIsKnown) {
            console.log("user with id " + data.receiver + " is not known yet!");
        }


        //socket.emit('usermessage', data);

        //socket.emit('serverMessage', data.sender + ' said: ' + data.text);
        //socket.broadcast.emit('serverMessage', 'dris wa gezegd geweest ' + data.text);
    });
});


//[EINDE CHAT]


module.exports = app;
