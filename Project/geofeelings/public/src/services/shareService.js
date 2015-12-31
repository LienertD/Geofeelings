/**
 * Created by Lienert on 23/12/2015.
 */

/**
 * OPMERKING VOOR LIENERT!!!!
 * post share zal niet werken
 * implementeer googleService
 * voorbeeld kan je vinden in profileservice (put functie)
 * Groetjes Jonatan
 */


var shareService = function ($http, $location, googleMapsService, shareVarsBetweenCtrl) {
    "use strict";

    //private
    var makeAddress = function (address) {
        if (address) {
            var split = address.split(",");
            return split[0] + ", " + split[1];
        } else {
            return null;
        }
    };

    var postShare = function (data) {
        $http({
            url: 'http://localhost:3000/api/share',
            method: 'POST',
            data: data
        }).success(function (serverData) {
            shareVarsBetweenCtrl.setProperty(serverData); //data kunnen doorgeven aan intro_sharedController
            $location.path("intro_shared");
        });
    };

    //public
    return {
        postShare: postShare,

        postShareAsync: function (data, cb) {

            if (data.address) {
                $http.post("/api/share", data).success(function (response) {
                    if (response.redirect) {
                        cb(null, response);
                    } else {
                        cb(null, new GfShare(data._id, data.userid, data.eventid, data.time, data.mood, data.lat, data.lng, makeAddress(data.address)));
                    }
                }).error(function (error) {
                    cb(error, null);
                });
            } else {
                googleMapsService.convertCoordinatesToAdress(data.lat, data.lng, function (err, address) {
                    if (!err) {
                        $http.post("/api/share", data).success(function (response) {
                            if (response.redirect) {
                                cb(null, response);
                            } else {
                                cb(null, new GfShare(data._id, data.userid, data.eventid, data.time, data.mood, data.lat, data.lng, makeAddress(address)));
                            }
                        }).error(function (error) {
                            cb(error, null);
                        });
                    } else {
                        cb(err, null);
                    }
                });
            }
        },

        getSharesByUserId: function (userid, cb) {
            $http.get("/api/share/user/" + userid).success(function (data) {
                if (data.redirect) {
                    cb(null, data);
                } else {
                    var shares = [];
                    angular.forEach(data, function (share) {
                        shares.push(new GfShare(share._id, share.userid, share.eventid, share.time, share.mood, share.lat, share.lng, makeAddress(share.address)));
                    });
                    cb(null, shares);
                }
            }).error(function (error) {
                cb(error, null);
            });
        },

        getSharesByEventId: function (eventid, cb) {
            $http.get("/api/share/event/" + eventid).success(function (data) {
                if (data.redirect) {
                    cb(null, data);
                } else {
                    var shares = [];
                    angular.forEach(data, function (share) {
                        shares.push(new GfShare(share._id, share.userid, share.eventid, share.time, share.mood, share.lat, share.lng, makeAddress(share.address)));
                    });
                    cb(null, shares);
                }
            }).error(function (error) {
                cb(error, null);
            });
        },

        getAllShares: function (cb) {
            $http.get("/api/share").success(function (data) {
                var shares = [];
                angular.forEach(data, function (share) {
                    shares.push(new GfShare(share._id, share.userid, share.eventid, share.time, share.mood, share.lat, share.lng, makeAddress(share.address)));
                });
                cb(null, shares);
            }).error(function (error) {
                cb(error, null);
            });
        }
    };
};
angular.module("geofeelings").factory("shareService", ["$http", "$location", "googleMapsService", "shareVarsBetweenCtrl", shareService]);
