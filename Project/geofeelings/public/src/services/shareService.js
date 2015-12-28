/**
 * Created by Lienert on 23/12/2015.
 */

/**
 * OPMERKING
 * post share zal niet werken
 * implementeer googleService
 * voorbeeld kan je vinden in profileservice (post functie)
 * Groetjes Jonatan
 */


var shareService = function ($http, $location, googleMapsService, shareVarsBetweenCtrl) {
    "use strict";

    //private
    var makeAddress = function (address) {
        var split = address.split(",");
        return split[0] + ", " + split[1];
    };

    var postShare = function (data) {
        $http({
            url: 'http://localhost:3000/api/share',
            method: 'POST',
            data: data,
            headers: {'Content-Type': 'application/json'}
        }).
        success(function (serverData) {
            shareVarsBetweenCtrl.setProperty(serverData); //data kunnen doorgeven aan intro_sharedController
            $location.path("intro_shared");
        });
    };

    //public
    return {
        postShare: postShare,
        getSharesByUserId: function (userid, cb) {
            $http.get("/api/share/" + userid).success(function (data) {
                if(data.redirect) {
                    cb(null, data);
                } else {
                    var shares = [];
                    angular.forEach(data, function(share) {
                        shares.push(new GfShare(share._id, share.userid, share.eventid, share.time, share.mood, share.lat, share.lng, makeAddress(share.address)));
                    });
                    cb(null, shares);
                }
            }).error(function (error) {
                cb(error, null);
            });
        }
    };
};
angular.module("geofeelings").factory("shareService", ["$http", "$location", "googleMapsService", "shareVarsBetweenCtrl", shareService]);
