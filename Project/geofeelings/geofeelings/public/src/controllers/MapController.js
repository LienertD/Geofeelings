/**
 * Created by Jonatan on 21/11/2015.
 */

(function () {
    "use strict";

    var mapController = function ($scope) {
        if (navigator.geolocation) {
            $scope.image = "./assets/common.png";
            $scope.mapOptions = {
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            };

            $scope.map = new google.maps.Map(document.querySelector("#map"), $scope.mapOptions);

            navigator.geolocation.getCurrentPosition(function (position) {
                $scope.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                $scope.marker = new google.maps.Marker({
                    position: $scope.map.getCenter(),
                    map: $scope.map,
                    icon: $scope.image
                });
            });
        } else {
            //throw exception
        }
    };

    angular.module("geofeelings").controller("mapController", ["$scope", mapController]);
})();