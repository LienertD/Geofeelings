/**
 * Created by Jonatan on 11/11/2015.
 */

(function () {
    "use strict";

    var app = angular.module("geofeelings", ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider.when("/search", {
            templateUrl: "./controllers/searchController/search.html"
        }).when("/intro", {
            templateUrl: "./controllers/introController/intro.html"
        }).when("/login", {
            templateUrl: "./controllers/loginController/login.html"
        }).when("/register", {
            templateUrl: "./controllers/registerController/register.html"
        }).when("/user", {
            templateUrl: "./controllers/userController/user.html"
        }).when("/event", {
            templateUrl: "./controllers/eventController/event.html"
        }).otherwise({
            redirectTo: "/search"
        });
    });
})();
