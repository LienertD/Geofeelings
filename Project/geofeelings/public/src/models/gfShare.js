function GFShare(id, user, userid, time, mood, lat, lng) {
    this.id = id;
    this.user = user;
    this.userid = userid;
    this.time = time;
    this.mood = mood;
    this.lat = lat;
    this.lng = lng;
}
GFShare.prototype.toString = function () {
    return this.user + " (" + this.time + ")";
};
