/**
 * Created by Jonatan on 22/12/2015.
 */

// https://developers.google.com/maps/documentation/geocoding/intro?csw=1#Geocoding
// Dit gebruiken om adressen te vertalen naar lat en lng of omgekeerd
// Waarom? => google maps werkt met lat en lng, wordt zo opgeslaan in de database

var googleMapsService = function () {
    "use strict";
    // private
    var mapoptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };
    var geocoder = new google.maps.Geocoder();
    var map = new google.maps.Map(document.querySelector("#map"), mapoptions);
    var infoWindow = new google.maps.InfoWindow();

    //public
    return {
        showLocationOnMap: function () {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                    var marker = new google.maps.Marker({
                        position: map.getCenter(),
                        map: map,
                        icon: "http://student.howest.be/jonatan.michiels/geofeelings/assets/location_now.png"
                    });
                });
            } else {
                // Throw map exception
            }
        },

        showAllMarkers: function (data) {
            var marker, i, content;
            for(i = 0; i < data.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].lat, data[i].lng),
                    map: map
                });

                google.maps.event.addListener(marker, "click", (function(marker, i) {
                    return function () {
                        content += "<h4>Title:" + data[i].address + "</h4>" + "<p>Mood: " + data[i].mood + "%</p>" + "<p>Time: " + data[i].time + "</p>";
                        infoWindow.setContent(content);
                    };
                })(marker, i));
            }
        },

        convertAdressToCoordinates: function (address, cb) {
            geocoder.geocode({address: address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    cb(null, results[0].geometry.location);
                } else {
                    cb(status, null);
                }
            });
        },

        convertCoordinatesToAdress: function (lat, lng, cb) {
            var location = new google.maps.LatLng(lat, lng);
            geocoder.geocode({latLng: location}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    cb(null, results[0].formatted_address);
                } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                    setTimeout(function(){
                        cb(null, results[0].formatted_address);
                    }, 200);
                } else {
                    cb(status, null);
                }
            });
        }
    };
};

angular.module("geofeelings").factory("googleMapsService", [googleMapsService]);