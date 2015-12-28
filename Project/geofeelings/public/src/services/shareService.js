/**
 * Created by Lienert on 23/12/2015.
 */

(function () {
    "use strict";

    var shareService = function ($http, shareVarsBetweenCtrl,$location) {

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
            getSharesByUserId: getSharesByUserId
        };
    };
    angular.module("geofeelings").factory("shareService", ["$http", "shareVarsBetweenCtrl","$location", shareService]);
})();