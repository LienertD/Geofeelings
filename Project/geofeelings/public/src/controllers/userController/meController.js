/**
 * Created by Jonatan on 21/12/2015.
 */

(function () {
    "use strict";

    var meController = function ($scope, $http, $location) {
        $scope.user = {};
        $http.get('/auth/user').success(function(data) {
            if(data.redirect) {
                $location.path(data.redirect);
            } else {
                console.log(data);
                $scope.user = data;
            }
        });

        $scope.logout = function() {
            $http.get('/auth/logout').success(function (data) {
                $location.path(data.redirect);
            });
        };

        $scope.save = function() {
            // API aanspreken => /api/user
        };
    };

    angular.module("geofeelings").controller("meController", ["$scope", "$http", "$location", meController]);
})();