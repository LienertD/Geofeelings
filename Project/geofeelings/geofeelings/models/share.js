function Share(id, user, time, mood, lat, lng) {
    this.id = id;
    this.user = user;
    this.time = time;
    this.mood = mood;
    this.lat = lat;
    this.lng = lng;
}

Share.prototype.toString = function () {
    return this.user + " (" + this.time + ")";
};