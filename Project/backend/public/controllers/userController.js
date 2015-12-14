/**
 * Created by Jonatan on 9/12/2015.
 */

(function () {
    "use strict";

    var userController = function ($http, $scope) {
        $scope.update = function () {
            $http.get('/user', {
                username : this.username,
                password : this.password,
                email : this.email,
                age : this.age,
                lat : this.lat,
                lng : this.lng
            });
        };
    };

    angular.module("passport").controller("userController", ["$http", "$scope", userController]);
})();