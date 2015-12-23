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
                    console.log(serverData);
                });
        };
        return {
            postShare: postShare
        };
    };
    angular.module("geofeelings").factory("shareService", ["$http",shareService]);
})();