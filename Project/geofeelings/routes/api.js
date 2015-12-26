/**
 * Created by Jonatan on 15/12/2015.
 */

var express = require('express');
var multer = require('multer');
var router = express.Router();
var upload = multer({ dest: './uploads/' });

var User = require("../models/user.js");
var Share = require('../models/share.js');
var Event = require('../models/event.js');

// SET HEADERS

router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// USERS

router.route('/user')
    .get(function (req, res) {
        if (req.user) {
            User.find(function (err, users) {
                if (err) {
                    res.send(err);
                }

                res.json(users);
            });
        } else {
            console.log("> User not logged in");
            res.json({redirect: '/login'});
        }
    });

//
router.route('/user/:id')
    .get(function (req, res) {
        if (req.user) {
            User.findById(req.params.id, function (err, user) {
                if (err) {
                    res.send(err);
                }

                res.json(user);
            });
        } else {
            console.log("> User not logged in");
            res.json({redirect: '/login'});
        }
    })

    .put(upload.single('userimage'), function (req, res) {
        //console.log(req.file);
        if (req.user) {
            User.findById(req.params.id, function (err, user) {
                if (err) {
                    res.send(err);
                }

                if (req.body.username && req.body.email) {
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
                    res.json({error: "username and email must be valid and not empty."});
                }
            })
        } else {
            console.log("> User not logged in");
            res.json({redirect: '/login'});
        }
    });

// SHARES

router.route('/share')
    .get(function (req, res) {
        if (req.user) {
            Share.find(function (err, shares) {
                if (err) {
                    res.send(err);
                }

                res.json(shares);
            });
        } else {
            console.log("> User not logged in");
            res.json({redirect: '/login'});
        }
    })

    .post(function (req, res) {
        if (req.user) {
            var newShare = new Share();
            newShare.userid = req.body.userid;
            newShare.eventid = req.body.eventid;
            newShare.time = req.body.time;
            newShare.mood = req.body.mood;
            newShare.lat = req.body.lat;
            newShare.lng = req.body.lng;

            newShare.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({share: newShare});
            });
        } else {
            console.log("> User not logged in");
            res.json({redirect: '/login'});
        }
    });

router.route('/share/:userid')
    .get(function (req, res) {
        if (req.user) {
            Share.find({userid: req.params.userid}, function (err, shares) {
                if (err) {
                    res.send(err);
                }

                res.json(shares);
            });
        } else {
            console.log("> User not logged in");
            res.json({redirect: '/login'});
        }
    });

router.route('/share/:eventid')
    .get(function (req, res) {
        if (req.user) {
            Share.find({eventid: req.params.eventid}, function (err, shares) {
                if (err) {
                    res.send(err);
                }

                res.json(shares);
            });
        } else {
            console.log("> User not logged in");
            res.json({redirect: '/login'});
        }

    });

router.route('/share/:id')
    .delete(function (req, res) {
        if (req.user.admin) {
            Share.findByIdAndRemove(req.params.id, function (err, share) {
                if (err) {
                    res.send(err);
                }

                res.json({message: "Share with id " + share._id + " is deleted."});
            });
        } else {
            console.log("> User not logged in");
            res.json({redirect: '/login'});
        }
    });

// EVENTS

router.route('/event')
    .get(function (req, res) {
        if (req.user) {
            Event.find(function (err, events) {
                if (err) {
                    res.send(err);
                }

                res.json(events);
            });
        } else {
            console.log("> User not logged in");
            res.json({redirect: '/login'});
        }
    })

    .post(function (req, res) {
        if (req.user) {
            var newEvent = new Event();
            newEvent.eventname = req.body.eventname;
            newEvent.eventimage = req.body.eventimage;
            newEvent.from = req.body.from;
            newEvent.until = req.body.until;
            newEvent.lat = req.body.lat;
            newEvent.lng = req.body.lng;

            newEvent.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({event: newEvent});
            });
        } else {
            console.log("> User not logged in");
            res.json({redirect: '/login'});
        }
    });

router.route('/event/:id')
    .get(function (req, res) {
        if (req.user) {
            Event.findById(req.params.id, function (err, event) {
                if (err) {
                    res.send(err);
                }

                res.json(event);
            });
        } else {
            console.log("> User not logged in");
            res.json({redirect: '/login'});
        }
    })

    .put(function (req, res) {
        if (req.user) {
            Event.findById(req.params.id, function (err, event) {
                if (err) {
                    res.send(err);
                }

                if (req.body.eventname && req.body.authorid && req.body.from && req.body.until && req.body.lat && req.body.lng) {
                    event.eventname = req.body.eventname;
                    event.authorid = req.body.authorid;
                    event.from = req.body.from;
                    event.until = req.body.until;
                    event.lat = req.body.lat;
                    event.lng = req.body.lng;

                    event.save(function (err) {
                        if (err) {
                            res.send(err);
                        }

                        res.json(event);
                    });
                } else {
                    res.json({error: "All fields are required except eventimage."});
                }
            })
        } else {
            console.log("> User not logged in");
            res.json({redirect: '/login'});
        }
    })

    .delete(function (req, res) {
        if (req.user.admin) {
            Event.findByIdAndRemove(req.params.id, function (err, event) {
                if (err) {
                    res.send(err);
                }

                res.json({message: "Event with id " + event._id + " is deleted."});
            });
        } else {
            console.log("> User not logged in");
            res.json({redirect: '/login'});
        }
    });

module.exports = router;