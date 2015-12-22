/**
 * Created by Jonatan on 15/12/2015.
 */

var express = require('express');
var router = express.Router();

var User = require("../models/user.js");
var Share = require('../models/share.js');
var Event = require('../models/event.js');

// USERS

router.route('/user')
    .get(function (req, res) {
        User.find(function (err, users) {
            if(err){
                res.send(err);
            }

            res.json(users);
        });
    });

router.route('/user/:id')
    .get(function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err) {
                res.send(err);
            }

            res.json(user);
        });
    })

    .put(function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err) {
                res.send(err);
            }

            if(req.body.username && req.body.email) {
                console.log(req.body.username);
                user.username = req.body.username;
                user.email = req.body.email;
                user.userimage = req.body.userimage;
                user.age = req.body.age;
                user.lat = req.body.lat;
                user.lng = req.body.lng;
                user.chat = req.body.chat;

                user.save(function (err) {
                    if (err) {
                        res.send(err);
                    }

                    res.json(user);
                });
            } else {
                res.json({ message : "username and email must be valid and not empty." });
            }
        })
    });

<<<<<<< HEAD
// SHARES

router.route('/share')
    .post(function (req, res) {
=======
    // POST SHARE
    app.post('/api/share', function (req, res) {
>>>>>>> origin/master
        var newShare = new Share();
        newShare.userid = req.body.userid;
        newShare.eventid = req.body.eventid;
        newShare.time = req.body.time;
        newShare.mood = req.body.mood;
        newShare.lat = req.body.lat;
        newShare.lng = req.body.lng;

        newShare.save(function (err) {
            if (err){
                res.send(err);
            }

            res.json({ share : newShare });
        });
    });

router.route('/share/:userid')
    .get(function (req, res) {
        Share.find({ userid : req.params.userid }, function (err, shares) {
            if(err){
                res.send(err);
            }

            res.json(shares);
        });
    });

router.route('/share/:eventid')
    .get(function (req, res) {
        Share.find({ eventid : req.params.eventid }, function (err, shares) {
            if(err){
                res.send(err);
            }

            res.json(shares);
        });
    });

router.route('/share/:id')
    .delete(function (req, res) {
        Share.findById(req.params.id, function (err, share) {
            if(err){
                res.send(err);
            }

            res.json({ message : "Share with " + share._id + " deleted."});
        });
    });

// EVENTS

router.route('/event')
    .get(function (req, res) {
        Event.find(function (err, events) {
            if(err){
                res.send(err);
            }

            res.json(events);
        });
    })

    .post(function (reg, res) {
        var newEvent = new Event();
        newEvent.eventname = req.body.eventname;
        newEvent.eventimage = req.body.eventimage;
        newEvent.from = req.body.from;
        newEvent.until = req.body.until;
        newEvent.lat = req.body.lat;
        newEvent.lng = req.body.lng;

        newEvent.save(function (err) {
            if (err){
                res.send(err);
            }

            res.json({ event : newEvent });
        });
    });

module.exports = router;