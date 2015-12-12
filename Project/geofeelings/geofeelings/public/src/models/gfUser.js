function GfUser(id, username, photoUrl, age, lat, lon) {
    this.id = id;
    this.username = username;
    this.photoUrl = photoUrl;
    this.age = age;
    this.lat = lat;
    this.lon = lon;
}
GfUser.prototype.toString = function () {
    return this.username;
};

GfUser.prototype.agenow = function () {
    var birthday = new Date(this.age.date);
    var age = Date.now() - birthday;
    console.log(age);
};
