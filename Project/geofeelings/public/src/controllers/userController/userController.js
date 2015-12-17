/**
 * Created by Jonatan on 1/12/2015.
 */

(function () {
        "use strict";

        var userController = function ($scope, $location, searchService) {

            $scope.init = function () {
                var userid = $location.search().userid;
                searchService.searchFromId(userid).then(userFoundWithId);
                searchService.getSharesByUserId(userid).then(sharesFoundWithId);
            };

            var userFoundWithId = function (res) {
                    $scope.userfoundwithid = res;

                    $scope.map.setCenter(new google.maps.LatLng(res.lat, res.lon));
                    if ($scope.marker !== undefined) {
                        $scope.marker.setMap(null); //verwijdert alle markers eerst
                    }
                    $scope.marker = new google.maps.Marker({
                        position: {lat: res.lat, lng: res.lon},
                        map: $scope.map,
                        icon: $scope.image
                    });
                }
                ;

            var sharesFoundWithId = function (res) {

                $scope.shareFoundWithUserId = res;


                //markers plaatsen en kaart verplaatsen naar hun gemiddelde
                var minLat = 100,
                    maxLat = 0,
                    minLng = 100,
                    maxLng = 0,
                    teller = 0,
                    gemLat = 0,
                    gemLng = 0;

                $scope.marker.setMap(null); //verwijdert alle markers eerst
                res.forEach(function (res) {
                    teller++;
                    if (res.lat < minLat) {
                        minLat = res.lat;
                    }
                    else if (res.lat > maxLat) {
                        maxLat = res.lat;
                    }

                    if (res.lng < minLng) {
                        minLng = res.lng;
                    }
                    else if (res.lng > maxLng) {
                        maxLng = res.lng;
                    }

                    $scope.marker = new google.maps.Marker({
                        position: {lat: res.lat, lng: res.lng},
                        map: $scope.map,
                        icon: $scope.image
                    });

                });

                if (teller == 1) {
                    gemLat = res[0].lat;
                    gemLng = res[0].lng;
                }
                else {
                    gemLat = (maxLat - minLat) / 2 + minLat;
                    gemLng = (maxLng - minLng) / 2 + minLng;
                }

                $scope.map.setCenter(new google.maps.LatLng(gemLat, gemLng));
                $scope.map.setZoom(12);
                //klaar met markers plaatsen en kaart verplaatsen naar hun gemiddelde
            };
        };

        angular.module("geofeelings").controller("userController", ["$scope", "$location", "searchService", userController]);
    })
();