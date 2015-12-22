/**
 * Created by Jonatan on 15/12/2015.
 */

var express = require('express');
var router = express.Router();

var User = require("../models/user.js");
var Share = require('../models/share.js');
var Event = require('../models/event.js');

router.route('/users')
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

router.route('/share')
    .post(function (req, res) {
        var newShare = new Share();
        newShare.userid = req.body.userid;
        newShare.eventid = req.body.eventid;
        newShare.time = req.body.timestamp;
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
        Share.find({ userid : req.params.userid }, function (err, share) {
            if(err){
                res.send(err);
            }

            res.json(share);
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

module.exports = router;