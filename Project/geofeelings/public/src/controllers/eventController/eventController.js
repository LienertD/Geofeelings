/**
 * Created by Jonatan on 4/12/2015.
 */


(function () {
    "use strict";

    var eventController = function ($scope, $location, $routeParams, eventService, shareService, profileService) {
        var eventid = $routeParams.param;
        eventService.getEventById(eventid, function(err, event) {
            if(!err) {
                $scope.event = event;
                $scope.event.address1 = splitAddress($scope.event.address, 0);
                $scope.event.address2 = splitAddress($scope.event.address, 1);

                if($scope.event.authorid) {
                    profileService.getUser(function(err, user) {
                        if(!err) {
                            if(user.redirect) {
                                $location.path(user.redirect);
                            } else {
                                if($scope.event.authorid === user._id) {
                                    $scope.event.isAuthor = true;
                                } else {
                                    $scope.event.isAuthor = false;
                                }
                            }
                        } else {
                            console.log("> error in userService: " + err);
                        }
                    });
                } else {
                    $scope.event.isAuthor = false;
                }

                shareService.getSharesByEventId($scope.event._id, function(err, shares) {
                    if(!err) {
                        if(shares.redirect) {
                            $location.path(shares.redirect);
                        } else {
                            $scope.shares = shares;
                        }
                    } else {
                        console.log("> error in shareService: " + err);
                    }
                });
            } else {
                console.log("> error in eventService: " + err);
            }
        });

        var splitAddress = function (address, part) {
            var split = address.split(",");
            return split[part];
        };

        var makeAddress = function (address1, address2) {
            return address1 + "," + address2;
        };
    };

    angular.module("geofeelings").controller("eventController", ["$scope", "$location", "$routeParams", "eventService", "shareService", "profileService", eventController]);
})();