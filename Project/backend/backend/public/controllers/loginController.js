/**
 * Created by Jonatan on 9/12/2015.
 */

(function () {
    "use strict";

    var loginController = function ($scope, $http) {
        $scope.login = function () {
            $http.post('/login', {
                username : this.username,
                password : this.password
            }).success(function (data) {
                console.log(data);
            });
        };

        $scope.register = function() {
            $http.post('/register', {
                username : this.username,
                password : this.password,
                email : this.email
            }).success(function (data) {
                console.log(data);
            });
        };
    };

    angular.module("passport").controller("loginController", ["$scope", "$http", loginController]);
})();