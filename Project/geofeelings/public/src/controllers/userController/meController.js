/**
 * Created by Jonatan on 21/12/2015.
 */

(function () {
    "use strict";

    var meController = function ($scope, $http, $location, profileService) {
        // GOOGLEMAPS SERVICE => CALLBACK FUNCTION
        profileService.getUser(function (err, data) {
            if (!err) {
                if (data.redirect) {
                    $location.path(data.redirect);
                } else {
                    $scope.$apply(function() {
                        $scope.user = data;
                        $scope.user.address1 = splitAddress(data.address, 0);
                        $scope.user.address2 = splitAddress(data.address, 1);
                    });
                }
            } else {
                console.log("> error: " + err);
            }
        });

        $scope.logout = function () {
            profileService.logout().then(function (data) {
                $location.path(data);
            });
        };

        // GOOGLEMAPS SERVICE => CALLBACK FUNCTION
        $scope.save = function (user) {
            user.address = makeAddress(user.address1, user.address2);
            profileService.saveUser(user, function(err, data) {
                if(!err) {
                    if (data.redirect) {
                        $location.path(data.redirect);
                    } else {
                        $scope.$apply(function() {
                            $scope.user = data;
                            $scope.user.address1 = splitAddress(data.address, 0);
                            $scope.user.address2 = splitAddress(data.address, 1);
                        });
                    }
                } else {
                    console.log("> error: " + err);
                }
            });
        };

        var splitAddress = function (address, part) {
            var split = address.split(",");
            return split[part];
        };

        var makeAddress = function (address1, address2) {
            return address1 + "," + address2;
        };
    };

    angular.module("geofeelings").controller("meController", ["$scope", "$http", "$location", "profileService", meController]);
})();