/**
 * Created by Jonatan on 21/12/2015.
 */

(function () {
    "use strict";

    var meController = function ($scope, $http, $location, googleMapsService) {
        $http.get('/auth/user').success(function(data) {
            if(data.redirect) {
                $location.path(data.redirect);
            }

            $scope.user = data;
            $scope.user.age = $scope.convertDate($scope.user.age);

            $http.get('/api/share/' + $scope.user._id).success(function (data) {
                if(data.redirect) {
                    $location.path(data.redirect);
                }

                $scope.shares = data;
            });
        });

        $scope.logout = function() {
            $http.get('/auth/logout').success(function (data) {
                $location.path(data.redirect);
            });
        };

        $scope.save = function(user) {
            var coord = $scope.convertAddress(makeAddress(user.address1, user.address2));
            user.lat = coord.lat;
            user.lng = coord.lng;

            $http.put('/api/user/' + $scope.user._id, user).success(function (data) {
                if (data.redirect) {
                    $location.path(data.redirect);
                } else {
                    $scope.user = data;
                    $scope.user.age = $scope.convertDate($scope.user.age);
                }
            });
        };

        $scope.convertCoord = function (lat, lng) {
            googleMapsService.convertCoordinateToAdress(lat, lng, function(err, address) {
                if(!err) {
                    $scope.$apply(function () {
                        return address;
                    });
                }
            });
        };

        $scope.convertAddress = function (address) {
            googleMapsService.convertAdressToCoordinates(address, function (err, coord) {
                if(!err) {
                    $scope.$apply(function () {
                        return {
                            lat : coord.lat(),
                            lng : coord.lng()
                        };
                    });
                }
            });
        };

        $scope.convertDate = function (date) {
            $scope.$apply(function () {
                return new Date(date);
            });
        };

        $scope.splitAddress = function (address, part) {
            $scope.$apply(function () {
                var split = address.split(",");
                $scope.address1 = split[0];
                $scope.address2 = split[1];
                return split[part];
            });
        };

        $scope.makeAddress = function (part1, part2) {
            $scope.$apply(function () {
                return part1 +  "," + part2;
            });
        };
    };

    angular.module("geofeelings").controller("meController", ["$scope", "$http", "$location", "googleMapsService", meController]);
})();