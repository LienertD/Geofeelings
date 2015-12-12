(function () {
    "use strict";

    var searchService = function ($http) {

        var search = function (searchString) {
            var url = './users.json';
            return $http.get(url).then(function (response) {

                var arSearchResults = [];
                angular.forEach(response.data.users.user, function (searchR) {
                    var newSR = new SearchResult(searchR.username, searchR.photoUrl, searchR.email, searchR._id.$oid);
                    arSearchResults.push(newSR);
                });
                return arSearchResults;
            });
        };

        var searchFromId = function (searchString) {
            var url = './users.json';
            return $http.get(url).then(function (response) {

                var userfound;
                angular.forEach(response.data.users.user, function (user) {
                    if (user._id.$oid == searchString) {
                        userfound = new GfUser(user._id.$oid, user.username, user.photoUrl, user.age, user.lat, user.lon);
                    }
                });
                return userfound;
            });
        };


        return {
            search: search,
            searchFromId: searchFromId
        };

    };

    angular.module("geofeelings").factory("searchService", ["$http", searchService]);

})();