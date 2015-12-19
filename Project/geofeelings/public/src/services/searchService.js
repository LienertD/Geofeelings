(function () {
    "use strict";

    var searchService = function ($http) {

        var search = function (searchString) {
            var url = 'http://localhost:3000/api/users';
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

        var getSharesByUserId = function (userid) {
            var url = 'http://localhost:3000/api/user/';
            return $http.get(url).then(function (response) {
                var sharesfound = [];
                angular.forEach(response.data.shares.share, function (share) {
                    if (share.userid == userid) {
                        var newShare = new GFShare(share._id.$oid, share.user, share.userid, share.time.$date, share.mood, share.lat, share.lng);
                        sharesfound.push(newShare);
                    }
                });
                return sharesfound;
            });
        };

        return {
            search: search,
            searchUserFromId: searchUserFromId,
            getSharesByUserId: getSharesByUserId
        };
    };
    angular.module("geofeelings").factory("searchService", ["$http", searchService]);
})();