function GfShare(id, userid, eventid, time, mood, lat, lng, address) {
    this.id = id;
    this.userid = userid;
    this.eventid = eventid;
    this.time = time;
    this.mood = mood;
    this.lat = lat;
    this.lng = lng;
    this.address = address;
}

GfShare.prototype.toString = function () {
    return this.userid + " (" + this.time + ")";
};
