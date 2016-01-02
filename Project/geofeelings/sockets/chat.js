/**
 * Created by Jonatan on 24/12/2015.
 */
/*
module.exports = function (io) {
    'use strict';
    io.on('connection', function (socket) {
        socket.on('message', function (from, msg) {
            console.log('recieved message from', from, 'msg', JSON.stringify(msg));
            console.log('broadcasting message');
            console.log('payload is', msg);
            io.sockets.emit('broadcast', {
                payload: msg,
                source: from
            });
            console.log('broadcast complete');
        });
    });
};
    */
var chat = function() {
    console.log("in chatmodule");

    var io = require("socket.io").listen(3001);
    var currentUsers = [];

    console.log("in de chatcode");

    io.sockets.on('connection', function (socket) {
        socket.on('clientMessage', function (data) {
            console.log(data);

            if (data.sender !== undefined) { //bepalen als zender toegevoegd moet worden aan currentUsers (lijst van de users met hun socketid)
                var isAlreadyKnown = false;
                for (var i = 0, len = currentUsers.length; i < len; i++) {
                    if (currentUsers[i].user == data.sender) {
                        isAlreadyKnown = true;
                    }
                }

                if (!isAlreadyKnown) { //toevogen aan gekendeusers
                    var asocketid = []; //in een array steken want een user kan op verschillende tabs/browsers chatten => meerdere socketids
                    asocketid.push(socket.id);
                    var userIdObj = {
                        "user": data.sender,
                        "socketids": asocketid
                    };
                    currentUsers.push(userIdObj);
                }

            }

            var receiverId;
            for (i = 0, len = currentUsers.length; i < len; i++) {
                if (currentUsers[i].user == data.receiver) {
                    receiverId = currentUsers[i].socketids[0];
                }
            }

            //socket.emit('usermessage', data);
            socket.to(receiverId).emit('usermessage', data);
            //socket.emit('serverMessage', data.sender + ' said: ' + data.text);
            //socket.broadcast.emit('serverMessage', 'dris wa gezegd geweest ' + data.text);
        });
    });
}
module.exports.getchat = chat;