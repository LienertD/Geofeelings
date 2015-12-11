(function() {
    "use strict";

    var searchService = function($http) {

        var search = function(searchString) {
            var url = './users.json';
            return $http.get(url).then(function(response) {
                var arSearchResults = [];
                angular.forEach(response.data.users.user, function(searchR) {
                    var newSR = new SearchResult(searchR.username, searchR.photoUrl, searchR.email, searchR.link, 0, 0);
                    arSearchResults.push(newSR);
                });
                return arSearchResults;
            });
        };


        return {
            search: search
        };

    };

    angular.module("geofeelings").factory("searchService", ["$http", searchService]);

})();