/**
 * Created by Jonatan on 15/12/2015.
 */

var mongoose = require('mongoose');
var EventSchema = mongoose.Schema({
    eventname : String,
    eventimage : Buffer,
    from : Date,
    until : Date,
    lat : Number,
    lng : Number
});

module.exports = mongoose.model('Event', EventSchema);