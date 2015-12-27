/**
 * Created by Jonatan on 27/12/2015.
 */

var profileService = function ($http, googleMapsService) {
    "use strict";
    // private
    /*var makeNewGfUser = function(data) {
        googleMapsService.convertCoordinateToAdress(data.lat, data.lng, function (err, address) {
            if(!err) {
                data.address = address;
            }

            return new GfUser(
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
            );
        });
    };*/

    var makeNewGfUser = function(data) {
        return googleMapsService.convertCoordinateToAdress(data.lat, data.lng).then(function(response) {
            return new GfUser(
                response._id,
                response.username,
                response.email,
                response.userimage,
                new Date(response.age),
                response.lat,
                response.lng,
                response.address,
                response.chat,
                response.admin
            );
        });
    };

    //public
    return {
        getUser : function () {
            return $http.get("/auth/user").then(function (data) {
                if(data.redirect) {
                    return data;
                } else {
                    return makeNewGfUser(data).then(function (response) {
                        return response;
                    });
                }
            });
        },

        saveUser : function (GfUser) {
            return googleMapsService.convertAdressToCoordinates(GfUser.address).then(function (coord) {
                GfUser.lat = coord.lat();
                GfUser.lng = coord.lng();

                $http.put("/api/user/" + GfUser.id, GfUser).then(function (data) {
                    if(data.redirect) {
                        return data;
                    } else {
                        return makeNewGfUser(data);
                    }
                });
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