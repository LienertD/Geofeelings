/**
 * Created by Jonatan on 30/12/2015.
 */

(function () {
    "use strict";

    var addEventController = function ($scope, $location, eventService, profileService) {
        $scope.newEvent = {};

        profileService.getUser(function(err, user) {
            if(!err) {
                if(user.redirect) {
                    $location.path(user.redirect);
                } else {
                    $scope.newEvent.authorid = user.id;
                }
            } else {
                console.log("> error in userService: " + err);
            }
        });

        $scope.createEvent = function() {
            $scope.newEvent.address = makeAddress($scope.newEvent.address1, $scope.newEvent.address2);
            eventService.postEvent($scope.newEvent, function (err, data) {
                if(!err) {
                    $location.path("/event/" + data.event._id);
                } else {
                    console.log("> error in eventService: " + err);
                }
            });
        };

        var makeAddress = function (address1, address2) {
            return address1 + "," + address2;
        };
    };

    angular.module("geofeelings").controller("addEventController", ["$scope", "$location", "eventService", "profileService", addEventController]);
})();