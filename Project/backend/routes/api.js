/**
 * Created by Jonatan on 15/12/2015.
 */
var User = require("../models/user.js");
var Share = require('../models/share.js');
var Event = require('../models/event.js');

module.exports = function (app) {
    // GET USERS
    app.get('/api/users', function (req, res) {
        User.find(function (err, users) {
            if(err){
                res.send(err);
            }

            res.header("Access-Control-Allow-Origin", "*");
            res.json(users);
        });
    });

    // GET USER BY ID
    app.get('/api/user/:id', function (req, res) {
        User.findById(req.params.id, function(err, user) {
            if (err) {
                res.send(err);
            }

            res.header("Access-Control-Allow-Origin", "*");
            res.json(user);
        });
    });

    // POST SHARE
    app.post('/api/share', function (req, res) {
        var newShare = new Share();
        newShare.userid = req.body.userid;
        newShare.eventid = req.body.eventid;
        newShare.time = req.body.timestamp;
        newShare.mood = req.body.mood;
        newShare.lat = req.body.lat;
        newShare.lng = req.body.lng;

        newShare.save(function (err) {
            if (err)
                res.send(err);

            res.header("Access-Control-Allow-Origin", "*");
            res.json({ share : newShare });
        });
    });
};