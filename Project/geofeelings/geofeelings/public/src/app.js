/**
 * Created by Jonatan on 11/11/2015.
 */

(function () {
    "use strict";

    var app = angular.module("geofeelings", []);
    app.directive("search", function() {
        return {
            restrict: "E",
            templatureUrl: "directives/search.html"
        };
    });
})();
