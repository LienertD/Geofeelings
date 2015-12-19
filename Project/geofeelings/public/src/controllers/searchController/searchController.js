/**
 * Created by Jonatan on 25/11/2015.
 */


(function () {
    "use strict";

    var searchController = function ($scope, searchService, sharedProperties) {

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

            if (i.username.toLowerCase().indexOf($scope.searchModel.toLocaleLowerCase()) >= 0) {
                return true;
            }
            if (i.description !== undefined) {
                if (i.description.toLowerCase().indexOf($scope.searchModel.toLocaleLowerCase()) >= 0) {
                    return true;
                }
            }

            return false;
        };


        var searchNow = function () {
            searchService.search($scope.searchModel).then(onResultsReady);
        };

        var onResultsReady = function (res) {
            $scope.searchResults = res;
        };

        var onResultsError = function (err) {
        };
    };

    angular.module("geofeelings").controller("searchController", ["$scope", "searchService","sharedProperties", searchController]);
})();