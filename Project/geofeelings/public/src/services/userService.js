(function () {
    "use strict";

    var userService = function ($http) {

        var getAllUsers = function (cb) {
            console.log("in de userservice");
            $http.get("/api/user").success(function (data) {
                if (data.redirect) {
                    cb(null, data);
                } else {

                var arSearchResults = [];
                    angular.forEach(data, function (searchR) {
                        var newSR = new SearchResult(searchR.username, searchR.email, searchR._id,"user");
                        arSearchResults.push(newSR);
                    });

                    console.log("user:");
                    console.log(arSearchResults);
                    cb(null, arSearchResults);
                }
            }).error(function (error) {
                cb(error, null);
            });
        };


        var searchUserFromId = function (searchString) {
            var url = 'http://localhost:3000/api/user/' + searchString;
            return $http.get(url).then(function (response) {
                return new GfUser(
                    response.data._id,
                    response.data.username,
                    response.data.email,
                    response.data.userimage,
                    response.data.age,
                    response.data.lat,
                    response.data.lng,
                    response.data.chat,
                    response.data.admin
                );

            });
        };

        return {
            getAllUsers: getAllUsers,
            searchUserFromId: searchUserFromId
        };
    };
    angular.module("geofeelings").factory("userService", ["$http", userService]);
})();