function GFShare(id, userid, eventid, time, mood, lat, lng) {
    this.id = id;
    this.userid = userid;
    this.eventid = eventid;
    this.time = time;
    this.mood = mood;
    this.lat = lat;
    this.lng = lng;
}
GFShare.prototype.toString = function () {
    return this.user + " (" + this.time + ")";
};
