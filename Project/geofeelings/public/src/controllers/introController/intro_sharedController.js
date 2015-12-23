/**
 * Created by Lienert on 21/12/2015.
 */

(function () {
    "use strict";

    var intro_sharedController = function ($scope, $http) {
        console.log( $scope.sharedShare);

    };
    angular.module("geofeelings").controller("intro_sharedController", ["$scope","$http", intro_sharedController]);
})();