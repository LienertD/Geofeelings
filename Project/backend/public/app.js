/**
 * Created by Jonatan on 9/12/2015.
 */

(function () {
    "use strict";

    var app = angular.module("passport", ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider.when("/login", {
            templateUrl: "./views/login.html"
        }).when("/register", {
            templateUrl: "./views/register.html"
        }).when("/user", {
            templateUrl: "./views/user.html"
        }).when("/login", {
            templateUrl: "./views/login.html"
        }).otherwise({
            redirectTo: "/login"
        });
    });
})();