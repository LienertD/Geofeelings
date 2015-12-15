/**
 * Created by Jonatan on 9/12/2015.
 */

(function () {
    "use strict";

    var userController = function ( $scope, $http, $location) {
        $http.get('/user').success(function(data) {
            if(data.redirect) {
                $location.path(data.redirect);
            } else {
                $scope.user = data;
            }
        });

        $scope.logout = function() {
            $http.get('/logout').success(function (data) {
                $location.path(data.redirect);
            });
        };
    };

    angular.module("passport").controller("userController", ["$scope", "$http", "$location", userController]);
})();