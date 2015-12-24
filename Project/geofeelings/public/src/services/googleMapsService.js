/**
 * Created by Jonatan on 22/12/2015.
 */

// https://developers.google.com/maps/documentation/geocoding/intro?csw=1#Geocoding
// Dit gebruiken om adressen te vertalen naar lat en lng of omgekeerd
// Waarom? => google maps werkt met lat en lng, wordt zo opgeslaan in de database

(function () {
    "use strict";

    var googleMapsService = function(){
        // private
        var geocoder = new google.maps.Geocoder();

        //public
        return {
            showOnMap : function(lat, lng) {

            },

            convertAdressToCoordinates : function (adress, cb) {
                geocoder.geocode({ address : adress }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        cb(null, results[0].geometry.location);
                    } else  {
                        cb(status, null);
                    }
                });
            },

            convertCoordinateToAdress : function (lat, lng, cb) {
                var location = new google.maps.LatLng(lat, lng);
                geocoder.geocode({ latLng : location }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        cb(null, results[0].formatted_address);
                    } else {
                        cb(status, null);
                    }
                });
            }
        };
    };

    angular.module("geofeelings").factory("googleMapsService", ["$http", googleMapsService]);
})();