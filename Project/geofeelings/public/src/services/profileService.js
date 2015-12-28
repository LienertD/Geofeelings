/**
 * Created by Jonatan on 27/12/2015.
 */

var profileService = function ($http, googleMapsService) {
    "use strict";

    // private
    var makeNewGfUser = function(data, cb) {
        googleMapsService.convertCoordinatesToAdress(data.lat, data.lng, function(err, response) {
            if(!err) {
                data.address = response;
                cb(null, new GfUser(
                    data._id,
                    data.username,
                    data.email,
                    data.userimage,
                    new Date(data.age),
                    data.lat,
                    data.lng,
                    data.address,
                    data.chat,
                    data.admin
                ));
            } else {
                cb(err, null);
            }
        });
    };

    //public
    return {
        getUser : function (cb) {
            $http.get("/auth/user").success(function (data) {
                if(data.redirect) {
                    cb(null, data);
                } else {
                    makeNewGfUser(data, function(err, response) {
                        if(!err) {
                            cb(null, response);
                        } else {
                            cb(err, null);
                        }
                    });
                }
            });
        },

        saveUser : function (user, cb) {
            googleMapsService.convertAdressToCoordinates(user.address, function(err, coord) {
                if(!err) {
                    user.lat = coord.lat();
                    user.lng = coord.lng();

                    $http.put("/api/user/" + user.id, user).then(function (data) {
                        if(data.redirect) {
                            cb(null, data);
                        } else {
                            makeNewGfUser(data, function(err, response) {
                                if(!err) {
                                    cb(null, response);
                                } else {
                                    cb(err, null);
                                }
                            });
                        }
                    });
                } else {
                    cb(err, null);
                }
            });
        },

        logout : function () {
            return $http.get("/auth/logout").then(function (data) {
                return data;
            });
        }
    };
};

angular.module("geofeelings").factory("profileService", ["$http", "googleMapsService", profileService]);