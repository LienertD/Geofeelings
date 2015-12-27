/**
 * Created by Jonatan on 21/12/2015.
 */

(function () {
    "use strict";

    var meController = function ($scope, $http, $location, googleMapsService) {
        $http.get('/auth/user').success(function(data) {
            if(data.redirect) {
                $location.path(data.redirect);
            } else {
                $scope.user = data;
                $scope.user.age = convertDate($scope.user.age);
                convertCoord($scope.user.lat, $scope.user.lng);

                $http.get('/api/share/' + $scope.user._id).success(function (data) {
                    if(data.redirect) {
                        $location.path(data.redirect);
                    }

                    $scope.shares = data;
                });
            }
        });

        $scope.logout = function() {
            $http.get('/auth/logout').success(function (data) {
                $location.path(data.redirect);
            });
        };

        $scope.save = function(user) {
            googleMapsService.convertAdressToCoordinates(makeAddress($scope.user.address1, $scope.user.address2), function(err, coord) {
                if(!err) {
                    $scope.$apply(function () {
                        $http.put('/api/user/' + $scope.user._id, user).success(function (data) {
                            if (data.redirect) {
                                $location.path(data.redirect);
                            } else {
                                $scope.user = data;
                                $scope.user.age = convertDate($scope.user.age);
                                convertCoord(coord.lat(), coord.lng());
                            }
                        });
                    });
                }
            });
        };

        var convertDate = function (date) {
            return new Date(date);
        };

        var splitAddress = function (address, part) {
            var split = address.split(",");
            return split[part];
        };

        var makeAddress = function (part1, part2) {
            return part1 +  "," + part2;
        };

        var convertCoord = function(lat, lng) {
            googleMapsService.convertCoordinateToAdress(lat, lng, function(err, address) {
                if(!err) {
                    $scope.$apply(function() {
                        $scope.user.address1 = splitAddress(address, 0);
                        $scope.user.address2 = splitAddress(address, 1);
                    });
                } else {
                    console.log("> error: " + err);
                }
            });
        };
    };

    angular.module("geofeelings").controller("meController", ["$scope", "$http", "$location", "googleMapsService", meController]);
})();