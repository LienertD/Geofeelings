/**
 * Created by Jonatan on 1/12/2015.
 */

(function () {
    "use strict";

    var userController = function ($scope, $location, searchService, shareService, $routeParams) {

        $scope.init = function () {
            var userid = $routeParams.param;
            searchService.searchUserFromId(userid).then(userFoundWithId);
            shareService.getSharesByUserId(userid).then(sharesFoundWithId); //IMPLEMENTEREN ALS JONATAN DE API FTIE HEEFT AANGEMAAKT
        };

        var userFoundWithId = function (res) {
            $scope.userfoundwithid = res;

            if (res.lat !== undefined && res.lat !== undefined) {
                $scope.map.setCenter(new google.maps.LatLng(res.lat, res.lng));
                if ($scope.marker !== undefined) {
                    $scope.marker.setMap(null); //verwijdert alle markers eerst
                }
                $scope.marker = new google.maps.Marker({
                    position: {lat: res.lat, lng: res.lng},
                    map: $scope.map,
                    icon: $scope.image
                });
            }
        };



        $scope.test = function(share)
        {
            $scope.map.setCenter(new google.maps.LatLng(share.lat, share.lng));
            $scope.map.setZoom(19);
        };

        var giveFeelingsImageArrayNumber = function (res) {
            if (res.mood > 80) {
                return 4;
            }
            else {
                return Math.round(res.mood / 20);
            }
        };

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

            var feelingImages = ["depressed", "sad", "common", "happy", "excited"];

            res.forEach(function (res) {

                teller++;
                if (res.lat < minLat) {
                    minLat = res.lat;
                }
                if (res.lat > maxLat) {
                    maxLat = res.lat;
                }

                if (res.lng < minLng) {
                    minLng = res.lng;
                }
                if (res.lng > maxLng) {
                    maxLng = res.lng;
                }

                res.moodImageSource = "./assets/" + feelingImages[giveFeelingsImageArrayNumber(res)] + ".png";

                $scope.marker = new google.maps.Marker({
                    position: {lat: res.lat, lng: res.lng},
                    map: $scope.map,
                    icon: res.moodImageSource
                });
            });

            if (teller == 1) {
                gemLat = res[0].lat;
                gemLng = res[0].lng;
            }
            else {
                gemLat = ((maxLat - minLat) / 2) + minLat;
                gemLng = ((maxLng - minLng) / 2) + minLng;
            }

            $scope.map.setCenter(new google.maps.LatLng(gemLat, gemLng));
            $scope.map.setZoom(14);
            //klaar met markers plaatsen en kaart verplaatsen naar hun gemiddelde
        };
    };

    angular.module("geofeelings").controller("userController", ["$scope", "$location", "searchService","shareService","$routeParams", userController]);
})
();