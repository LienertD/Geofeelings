/**
 * Created by Jonatan on 28/12/2015.
 */

var eventService = function ($http) {
    "use strict";

    //private

    //public
    return {
        getEventById : function (eventid, cb) {
            $http.get("/api/event/" + eventid).success(function (data) {
                if(data.redirect) {
                    cb(null, data);
                } else {
                    cb(null, new GfEvent(data._id, data.eventname, data.eventimage, data.authorid, data.from, data.until, data.lat, data.lng, data.address));
                }
                cb(null, data);
            }).error(function (error) {
                cb(error, null);
            });
        }
    };
};

angular.module("geofeelings").factory("eventService", ["$http", "googleMapsService", eventService]);