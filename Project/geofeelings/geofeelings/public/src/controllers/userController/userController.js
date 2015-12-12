/**
 * Created by Jonatan on 1/12/2015.
 */

(function () {
    "use strict";

    var userController = function ($scope, $location, searchService) {

        $scope.init = function () {
            var userid = $location.search().userid;
            searchService.searchFromId(userid).then(userFoundWithId);
        };

        var userFoundWithId = function (res) {
            $scope.userfoundwithid = res;

            $scope.map.setCenter(new google.maps.LatLng(res.lat, res.lon));
            $scope.marker.setMap(null); //verwijdert alle markers eerst
            $scope.marker = new google.maps.Marker({
                position: {lat:res.lat, lng:res.lon},
                map: $scope.map,
                icon: $scope.image
            });
        };
    };

    angular.module("geofeelings").controller("userController", ["$scope", "$location", "searchService", userController]);
})();