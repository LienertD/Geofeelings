/**
 * Created by Jonatan on 21/11/2015.
 */

(function () {
    "use strict";

    var mainController = function ($scope, googleMapsService, shareService, eventService) {
        shareService.getAllShares(function (err, shares) {
            if (!err) {
                angular.forEach(shares, function (share) {
                    if (share.eventid) {
                        eventService.getEventById(share.eventid, function (err, event) {
                            if (!err) {
                                share.address = event.eventname;
                            } else {
                                console.log("> error in shareService: " + err);
                            }
                        });
                    }
                });
                googleMapsService.showLocationOnMap();
                googleMapsService.showAllMarkers(shares);
            } else {
                console.log("> error in shareService: " + err);
            }
        });
    };

    angular.module("geofeelings").controller("mainController", ["$scope", "googleMapsService", "shareService", "eventService", mainController]);
})();