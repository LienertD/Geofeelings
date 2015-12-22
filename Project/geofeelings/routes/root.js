/**
 * Created by Jonatan on 22/12/2015.
 */

var express = require('express');
var router = express.Router();

router.route('/').get(function (req, res) {
    res.sendFile('./public/index.html');
});

module.exports = router;