/**
 * Created by Jonatan on 4/12/2015.
 */


(function () {
    "use strict";

    var eventController = function ($scope, $location, $sce, $routeParams, eventService, shareService, profileService) {
        var eventid = $routeParams.param;
        $scope.newEvent = {};

        eventService.getEventById(eventid, function(err, event) {
            if(!err) {
                $scope.event = event;
                $scope.event.mood = 50;
                $scope.event.eventid = event.id;
                $scope.event.address1 = splitAddress($scope.event.address, 0);
                $scope.event.address2 = splitAddress($scope.event.address, 1);

                if(!$scope.event.eventimage) {
                    $scope.event.eventimage = "http://student.howest.be/jonatan.michiels/geofeelings/assets/event.png";
                }

                if($scope.event.authorid) {
                    profileService.getUser(function(err, user) {
                        if(!err) {
                            $scope.event.userid = user.id;

                            if(user.redirect) {
                                $location.path(user.redirect);
                            } else {
                                return $scope.event.authorid === user.id;
                            }
                        } else {
                            console.log("> error in userService: " + err);
                        }
                    });
                } else {
                    $scope.event.isAuthor = false;
                }

                shareService.getSharesByEventId(event.id, function(err, shares) {
                    if(!err) {
                        if(shares.redirect) {
                            $location.path(shares.redirect);
                        } else {
                            if(shares.length > 0) {
                                $scope.sharesforevent = shares;
                            } else {
                                $scope.noShares = "<div>No shares for this event.</div>";
                            }
                        }
                    } else {
                        console.log("> error in shareService: " + err);
                    }
                });
            } else {
                console.log("> error in eventService: " + err);
            }
        });

        $scope.renderHtml = function(html) {
            return $sce.trustAsHtml(html);
        };

        $scope.postShare = function() {
            $scope.event.time = new Date();
            shareService.postShareAsync($scope.event, function(err, data) {
                if(!err) {
                    if(data.redirect) {
                        $location.path(data.redirect);
                    } else {
                        $scope.event = data;
                    }
                } else {
                    console.log("> error in shareService: " + err);
                }
            });
        };

        $scope.updateEvent = function() {
            $scope.event.address = makeAddress($scope.event.address1, $scope.event.address2);
            eventService.updateEvent($scope.event, function(err, data) {
                if(!err) {
                    if(data.redirect) {
                        $location.path(data.redirect);
                    } else {
                        $scope.event = data;
                        $scope.event.address1 = splitAddress($scope.event.address, 0);
                        $scope.event.address2 = splitAddress($scope.event.address, 1);
                    }
                } else {
                    console.log("> error in eventService: " + err);
                }
            });
        };

        $scope.createEvent = function() {
            $scope.newEvent.address = makeAddress($scope.newEvent.address1, $scope.newEvent.address2);
            $scope.newEvent.authorid = $scope.event.userid;
            eventService.postEvent($scope.newEvent, function (err, data) {
                if(!err) {
                    $scope.event = data;
                    $location.path("/event/" + data.id);
                } else {
                    console.log("> error in eventService: " + err);
                }
            });
        };

        var splitAddress = function (address, part) {
            var split = address.split(",");
            return split[part];
        };

        var makeAddress = function (address1, address2) {
            return address1 + "," + address2;
        };
    };

    angular.module("geofeelings").controller("eventController", ["$scope", "$location", "$sce", "$routeParams", "eventService", "shareService", "profileService", eventController]);
})();