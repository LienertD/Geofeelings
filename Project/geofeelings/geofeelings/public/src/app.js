/**
 * Created by Jonatan on 11/11/2015.
 */

(function () {
    "use strict";

    var app = angular.module("geofeelings", ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider.when("/admin", {
            templateUrl: "./controllers/adminController/admin.html"
        }).when("/search", {
            templateUrl: "./controllers/searchController/search.html"
        }).when("/intro", {
            templateUrl: "./controllers/introController/intro.html"
        }).when("/help", {
            templateUrl: "./directives/help.html"
        }).when("/login", {
            templateUrl: "./controllers/loginController/login.html"
        }).when("/register", {
            templateUrl: "./controllers/registerController/register.html"
        }).when("/user", {
            templateUrl: "./controllers/userController/user.html"
        }).when("/me", {
            templateUrl: "./controllers/userController/me.html"
        }).when("/event", {
            templateUrl: "./controllers/eventController/event.html"
        }).when("/addEvent", {
            templateUrl: "./controllers/eventController/addEvent.html"
        }).when("/location", {
            templateUrl: "./controllers/locationController/location.html"
        }).otherwise({
            redirectTo: "/intro"
        });
    });
})();
