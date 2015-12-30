/**
 * Created by Jonatan on 25/11/2015.
 */


(function () {
    "use strict";

    var searchController = function ($scope, userService, eventService) {

        $scope.searchModel = null;

        $scope.searchOnSubmit = function (formObj) {
            if ($scope.searchModel.length > 0) {
                searchNow();
            }
        };
        $scope.searchOnKeyPress = function () {
            if ($scope.searchModel !== null) {
                searchNow();
            }
        };

        $scope.filterSearchResults = function (i) {
            if ($scope.searchModel === "") {
                return false;
            }

            if (i.title.toLowerCase().indexOf($scope.searchModel.toLocaleLowerCase()) >= 0) {
                return true;
            }
            if (i.subtitle !== undefined) {
                if (i.subtitle.toLowerCase().indexOf($scope.searchModel.toLocaleLowerCase()) >= 0) {
                    return true;
                }
            }

            return false;
        };

        var searchNow = function () {
            $scope.maxResExceeded = false;

            userService.getAllUsers(function (err, results) {
                if (err) {
                    console.log("error:" + err);
                }
                else {
                    var visibleres = [];
                    var i = 0, max = 5;
                    angular.forEach(results, function (res) {
                        if (i < max) {
                            visibleres.push(res);
                            i++;
                        }
                    });
                    $scope.searchResultsUsers = visibleres;
                }
            });

            eventService.getAllEvents(function (err, results) {
                if (err) {
                    console.log("error:" + err);
                }
                else {
                    var visibleres = [];
                    var i = 0, max = 5;
                    angular.forEach(results, function (res) {
                        if (i < max) {
                            visibleres.push(res);
                            i++;
                        }
                    });
                    $scope.searchResultsEvents = visibleres;
                }
            });
        };
    };

    angular.module("geofeelings").controller("searchController", ["$scope", "userService", "eventService", searchController]);
})();