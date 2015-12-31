/**
 * Created by Jonatan on 6/12/2015.
 */

(function () {
    "use strict";

    var adminController = function ($scope, $location, eventService, shareService, profileService) {
        profileService.getUser(function (err, user) {
            if(!err) {
                if(user.redirect) {
                    $location.path(user.redirect);
                } else {
                    if(user.admin) {
                        eventService.getEvents(function (err, data) {
                            if(!err) {
                                if(data.redirect) {
                                    $location.path(data.redirect);
                                } else {
                                    $scope.eventsAdmin = data;
                                }
                            }
                            else {
                                console.log("> error eventService: " + err);
                            }
                        });

                        shareService.getAllShares(function (err, data) {
                            if(!err) {
                                if(data.redirect) {
                                    $location.path(data.redirect);
                                } else {
                                    $scope.sharesAdmin = data;
                                }
                            } else {
                                console.log("> error shareService: " + err);
                            }
                        });
                    } else {
                        $location.path("/intro");
                    }
                }
            } else {
                console.log("> error profileService: " + err);
            }
        });

        $scope.deleteEvent = function (event) {
            eventService.deleteEvent(event, function(err, data) {
                if(!err) {
                    $scope.eventsAdmin.splice($scope.eventsAdmin.indexOf(event), 1);
                    window.alert(data.message);
                } else {
                    console.log("> error eventService: " + err);
                }
            });
        };

        $scope.deleteShare = function (share) {
            shareService.deleteShare(share, function(err, data) {
                if(!err) {
                    $scope.sharesAdmin.splice($scope.sharesAdmin.indexOf(share), 1);
                    window.alert(data.message);
                } else {
                    console.log("> error shareService: " + err);
                }
            });
        };
    };

    angular.module("geofeelings").controller("adminController", ["$scope", "$location", "eventService", "shareService", "profileService", adminController]);
})();