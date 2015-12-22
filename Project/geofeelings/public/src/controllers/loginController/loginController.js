/**
 * Created by Jonatan on 26/11/2015.
 */

(function () {
    "use strict";

    var loginController = function ($scope, $http, $location) {
        $scope.login = function () {
            $http.post('/login', {
                username : $scope.username,
                password : $scope.password
            }).success(function (data) {
                $scope.error = data.error;
                $location.path(data.redirect);
            });
        };

        $scope.register = function() {
            $http.post('/register', {
                username : $scope.username,
                password : $scope.password,
                email : $scope.email
            }).success(function (data) {
                $scope.error = data.error;
                $location.path(data.redirect);
            });
        };
    };

    angular.module("geofeelings").controller("loginController", ["$scope", "$http", "$location", loginController]);
})();