function Event(id, name, from, to, lat, lng) {
    this.id = id;
    this.name = name;
    this.from = from;
    this.to = to;
    this.lat = lat;
    this.lng = lng;
}

Event.prototype.toString = function () {
    return this.name;
};