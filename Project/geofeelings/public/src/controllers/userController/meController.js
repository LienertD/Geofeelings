/**
 * Created by Jonatan on 21/12/2015.
 */

(function () {
    "use strict";

    var meController = function ($scope, $http, $location, profileService) {
        profileService.getUser().then(function (data) {
            if (data.redirect) {
                $location.path(data.redirect);
            } else {
                $scope.user = data;
                $scope.user.address1 = splitAddress(data.address, 0);
                $scope.user.address2 = splitAddress(data.address, 1);
            }
        });

        $scope.logout = function () {
            profileService.logout().then(function (data) {
                $location.path(data);
            });
        };

        $scope.save = function (user) {
            profileService.saveUser(user).then(function (data) {
                if (data.redirect) {
                    $location.path(data.redirect);
                } else {
                    $scope.user = data;
                    $scope.user.address1 = splitAddress(data.address, 0);
                    $scope.user.address2 = splitAddress(data.address, 1);
                }
            });
        };

        var splitAddress = function (address, part) {
            var split = address.split(",");
            return split[part];
        };
    };

    angular.module("geofeelings").controller("meController", ["$scope", "$http", "$location", "profileService", meController]);
})();