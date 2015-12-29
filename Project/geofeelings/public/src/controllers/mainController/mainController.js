/**
 * Created by Jonatan on 21/11/2015.
 */

(function () {
    "use strict";

    var mainController = function ($scope, googleMapsService) {
        googleMapsService.showLocationOnMap();

    };

    angular.module("geofeelings").controller("mainController", ["$scope", "googleMapsService", mainController]);
})();