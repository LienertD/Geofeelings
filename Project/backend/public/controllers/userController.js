/**
 * Created by Jonatan on 9/12/2015.
 */

(function () {
    "use strict";

    var userController = function ( $scope, $http, $location) {
        $http.get('/api/user').success(function(data) {
            $scope.user = data;
        });

        $scope.logout = function() {
            $http.get('/logout').success(function (data) {
                $location.path(data.redirect);
            });
        };
    };

    angular.module("passport").controller("userController", ["$scope", "$http", "$location", userController]);
})();