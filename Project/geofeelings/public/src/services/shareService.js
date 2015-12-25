/**
 * Created by Lienert on 23/12/2015.
 */

(function () {
    "use strict";

    var shareService = function ($http) {

        var postShare = function (data) {

            $http({
                url: 'http://localhost:3000/api/share',
                method: 'POST',
                data: data,
                headers: {'Content-Type': 'application/json'}
            }).
                success(function (serverData) {
                    console.log("dees moetk nog naar een andere controller krijgen "+serverData);
                });
        };

        var getSharesByUserId = function (userid) {
            var url = 'http://localhost:3000/api/share/' + userid; //NIEUW PAD!!! (al aangepast)
            return $http.get(url).then(function (response) {

                var sharesfound = [];
                angular.forEach(response.data, function (share) {
                    var newShare = new GFShare(share._id, share.userid, share.eventid, share.time, share.mood, share.lat, share.lng);
                    sharesfound.push(newShare);
                });
                return sharesfound;
            });
        };

        return {
            postShare: postShare,
            getSharesByUserId:getSharesByUserId
        };
    };
    angular.module("geofeelings").factory("shareService", ["$http",shareService]);
})();