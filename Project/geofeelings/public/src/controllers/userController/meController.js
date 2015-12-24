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
            $scope.user.age = new Date($scope.user.age);
            googleMapsService.convertCoordinateToAdress($scope.user.lat, $scope.user.lng, function(err, address) {
                if(!err) {
                    $scope.user.address = address;
                }
            });
        });

        $scope.logout = function() {
            $http.get('/auth/logout').success(function (data) {
                $location.path(data.redirect);
            });
        };

        $scope.save = function(user) {
            // API aanspreken => /api/user

            $http.put('/api/user/' + $scope.user._id, user).success(function (data) {
                if (data.redirect) {
                    $location.path(data.redirect);
                } else {
                    $scope.user = data;
                    $scope.user.age = new Date($scope.user.age);
                }
            });
        };
    };

    angular.module("geofeelings").controller("meController", ["$scope", "$http", "$location", "googleMapsService", meController]);
})();