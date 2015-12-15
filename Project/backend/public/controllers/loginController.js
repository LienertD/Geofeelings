/**
 * Created by Jonatan on 9/12/2015.
 */

(function () {
    "use strict";

    var loginController = function ($scope, $http, $location) {
        $scope.login = function () {
            $http.post('/login', {
                username : this.username,
                password : this.password
            }).success(function (data) {
                $scope.error = data.error;
                $location.path(data.redirect);
            });
        };

        $scope.register = function() {
            $http.post('/register', {
                username : this.username,
                password : this.password,
                email : this.email
            }).success(function (data) {
                $scope.error = data.error;
                $location.path(data.redirect);
            });
        };
    };

    angular.module("passport").controller("loginController", ["$scope", "$http", "$location", loginController]);
})();