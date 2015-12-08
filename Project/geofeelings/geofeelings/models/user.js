function User(id, username, age, lat, lng)
{
    this.id = id;
    this.username = username;
    this.age = age;
    this.lat = lat;
    this.lng = lng;
}

User.prototype.toString = function(){
    return this.username;
};