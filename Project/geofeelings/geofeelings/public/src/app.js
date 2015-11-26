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

    app.directive("login", function(){
        return {
            restrict: "E",
            templatureUrl: "directives/login.html"
        };
    });

    app.directive("register", function(){
        return {
            restrict: "E",
            templatureUrl: "directives/register.html"
        };
    });

    /*app.config(function ($routeProvider) {
        $routeProvider.when("/results", {

        }).otherwise({

        });
    });*/
})();
