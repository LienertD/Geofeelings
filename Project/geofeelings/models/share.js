/**
 * Created by Jonatan on 15/12/2015.
 */

var mongoose = require('mongoose');
var ShareSchema = mongoose.Schema({
    userid : String,
    eventid : Number,
    time : Date,
    mood : Number,
    lat : Number,
    lng : Number
});

module.exports = mongoose.model('Share', ShareSchema);