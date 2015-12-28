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

<<<<<<< HEAD
    var shareService = function ($http, shareVarsBetweenCtrl,$location) {
=======
var shareService = function ($http, googleMapsService) {
    "use strict";
>>>>>>> origin/master

    var makeAddress = function (address) {
        var split = address.split(",");
        return split[0] + ", " + split[1];
    };

<<<<<<< HEAD
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
=======
    var postShare = function (data) {
>>>>>>> origin/master

        $http({
            url: 'http://localhost:3000/api/share',
            method: 'POST',
            data: data,
            headers: {'Content-Type': 'application/json'}
        }).
        success(function (serverData) {
            console.log("dees moetk nog naar een andere controller krijgen " + serverData);
        });
    };

    /* old */
    /*var getSharesByUserId = function (userid) {
        var url = 'http://localhost:3000/api/share/' + userid; //NIEUW PAD!!! (al aangepast)
        return $http.get(url).then(function (response) {
            var sharesfound = [];
            angular.forEach(response.data, function (share) {
                var newShare = new GfShare(share._id, share.userid, share.eventid, share.time, share.mood, share.lat, share.lng);
                sharesfound.push(newShare);
            });
            return sharesfound;
        });
    };*/

<<<<<<< HEAD
        return {
            postShare: postShare,
            getSharesByUserId: getSharesByUserId
        };
    };
    angular.module("geofeelings").factory("shareService", ["$http", "shareVarsBetweenCtrl","$location", shareService]);
})();
=======
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
angular.module("geofeelings").factory("shareService", ["$http", "googleMapsService", shareService]);
>>>>>>> origin/master
