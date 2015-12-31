/**
 * Created by Jonatan on 21/12/2015.
 */

(function () {
    "use strict";

    var meController = function ($scope, $http, $location, $sce, profileService, shareService) {
        profileService.getUser(function (err, user) {
            if (!err) {
                if (user.redirect) {
                    $location.path(user.redirect);
                } else {
                    $scope.user = user;
                    if(user.address) {
                        $scope.user.address1 = splitAddress(user.address, 0);
                        $scope.user.address2 = splitAddress(user.address, 1);
                    }

                    if(!user.age) {
                        $scope.user.age = new Date();
                    }

                    shareService.getSharesByUserId(user.id, function (err, shares) {
                        if(!err) {
                            if(shares.redirect) {
                                $location.path(shares.redirect);
                            } else {
                                if(shares.length > 0) {
                                    $scope.sharesforprofile = shares;
                                } else {
                                    $scope.noSharesForUser = "<div>You have no shares yet, go share one <a href='#/intro'>here</a></div>";
                                }
                            }
                        } else {
                            console.log("> error shareService: " + err);
                        }
                    });
                }
            } else {
                console.log("> error profileService: " + err);
            }
        });

        $scope.save = function (user) {
            user.address = makeAddress(user.address1, user.address2);
            profileService.saveUser(user, function(err, data) {
                if(!err) {
                    if (data.redirect) {
                        $location.path(data.redirect);
                    } else {
                        $scope.user = data;
                        $scope.user.address1 = splitAddress(data.address, 0);
                        $scope.user.address2 = splitAddress(data.address, 1);
                    }
                } else {
                    console.log(">  error: " + err);
                }
            });
        };

        $scope.logout = function () {
            profileService.logout().then(function (data) {
                $location.path(data);
            });
        };

        $scope.renderHtml = function(html) {
            return $sce.trustAsHtml(html);
        };

        var splitAddress = function (address, part) {
            var split = address.split(",");
            return split[part];
        };

        var makeAddress = function (address1, address2) {
            return address1 + "," + address2;
        };
    };

    angular.module("geofeelings").controller("meController", ["$scope", "$http", "$location", "$sce", "profileService", "shareService", meController]);
})();