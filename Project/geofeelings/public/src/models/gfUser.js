function GfUser(id, username, email, userimage, age, lat, lng, chat, admin) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.userimage = userimage;
    this.age = age;
    this.lat = lat;
    this.lng = lng;
    this.chat = chat;
    this.admin = admin;
}
GfUser.prototype.toString = function () {
    return this.username;
};
