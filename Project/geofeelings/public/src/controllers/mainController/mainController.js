/**
 * Created by Jonatan on 21/11/2015.
 */

(function () {
    "use strict";

    var mainController = function ($scope, googleMapsService, shareService, eventService) {
        shareService.getAllShares(function (err, shares) {
            if (!err) {
                googleMapsService.showLocationOnMap();
                googleMapsService.showAllMarkers(shares);
                $scope.shares = shares;
                $scope.timelapse = 100;
                $scope.timestamp = "All time";
            } else {
                console.log("> error in shareService: " + err);
            }
        });

        $scope.$watch("timelapse", function() {
            if($scope.timelapse >= 80) {
                $scope.timestamp = "All time";
                googleMapsService.showAllMarkers($scope.shares);
            } else if($scope.timelapse >= 60 && $scope.timelapse < 80) {
                $scope.timestamp = "Last year";
                googleMapsService.showAllMarkers(filterSharesOnTime(new Date(1, 0, 0, 0, 0, 0, 0)));
            } else if($scope.timelapse >= 40 && $scope.timelapse < 60) {
                $scope.timestamp = "Last month";
                googleMapsService.showAllMarkers(filterSharesOnTime(new Date(0, 1, 0, 0, 0, 0, 0)));
            } else if($scope.timelapse >= 20 && $scope.timelapse < 40) {
                $scope.timestamp = "Last week";
                googleMapsService.showAllMarkers(filterSharesOnTime(new Date(0, 0, 7, 0, 0, 0, 0)));
            } else if($scope.timelapse > 0 && $scope.timelapse < 20) {
                $scope.timestamp = "Last day";
                googleMapsService.showAllMarkers(filterSharesOnTime(new Date(0, 0, 1, 0, 0, 0, 0)));
            } else {
                $scope.timestamp = "last hour";
                googleMapsService.showAllMarkers(filterSharesOnTime(new Date(0, 0, 0, 1, 0, 0, 0)));
            }
        });

        var filterSharesOnTime = function(timeago) {
            var shares = [];
            angular.forEach($scope.shares, function(share) {
                if(timeago <= (new Date() - share.time)) {
                    shares.push(share);
                }
            });
            return shares;
        }
    };

    angular.module("geofeelings").controller("mainController", ["$scope", "googleMapsService", "shareService", "eventService", mainController]);
})();