/**
 * Created by Jonatan on 22/12/2015.
 */

// https://developers.google.com/maps/documentation/geocoding/intro?csw=1#Geocoding
// Dit gebruiken om adressen te vertalen naar lat en lng of omgekeerd
// Waarom? => google maps werkt met lat en lng, wordt zo opgeslaan in de database

var googleMapsService = function () {
    "use strict";
    // private
    var geocoder = new google.maps.Geocoder();

    //public
    return {
        showLocationOnMap: function (lat, lng) {

        },

        /*convertAdressToCoordinates: function (address, cb) {
            geocoder.geocode({address: address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    cb(null, results[0].geometry.location);
                } else {
                    cb(status, null);
                }
            });
        },*/

        convertAdressToCoordinates: function (address) {
            return geocoder.geocode({address: address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    return results[0].geometry.location;
                } else {
                    return status;
                }
            });
        },

        /*convertCoordinateToAdress: function (lat, lng, cb) {
            var location = new google.maps.LatLng(lat, lng);
            geocoder.geocode({latLng: location}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    cb(null, results[0].formatted_address);
                } else {
                    cb(status, null);
                }
            });
        },*/

        convertCoordinateToAdress: function (lat, lng) {
            var location = new google.maps.LatLng(lat, lng);
            return geocoder.geocode({ latLng : location }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    return results[0].formatted_address;
                } else {
                    return status;
                }
            });
        }
    };
};

angular.module("geofeelings").factory("googleMapsService", [googleMapsService]);