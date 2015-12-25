(function () {
    "use strict";

    var searchService = function ($http) {

        var search = function (searchString) {
            var url = 'http://localhost:3000/api/user/';

            return $http.get(url).then(function (response) {

                var arSearchResults = [];
                angular.forEach(response.data, function (searchR) {
                    var newSR = new SearchResult(searchR._id, searchR.username);
                    arSearchResults.push(newSR);
                });
                return arSearchResults;
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
            search: search,
            searchUserFromId: searchUserFromId
        };
    };
    angular.module("geofeelings").factory("searchService", ["$http", searchService]);
})();