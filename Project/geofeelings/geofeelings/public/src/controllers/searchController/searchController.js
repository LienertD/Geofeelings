/**
 * Created by Jonatan on 25/11/2015.
 */


(function () {
    "use strict";

    var searchController = function ( $scope, searchService) {

        $scope.searchModel = null;

        $scope.searchOnSubmit= function(formObj) {
                if($scope.searchModel.length>0)
                {
                    searchNow();
                }
        };
        $scope.searchOnKeyPress = function(){
            if($scope.searchModel!=null)
            searchNow();
        };

        var searchNow = function()
        {
            console.log($scope.searchModel);
            $scope.SearchResults = null;
            searchService.search($scope.searchModel).then(onResultsReady, onResultsError);
        }
    };

    angular.module("geofeelings").controller("searchController", ["$scope", searchController]);
})();