/**
 * Created by liene on 28/12/2015.
 */


var shareVarsBetweenCtrl = function () {
    "use strict";

    //private
     var property;

    //public
    return {

        getProperty: function () {
            return property;
        },

        setProperty: function (value) {
            property = value;
        }
    };
};

angular.module("geofeelings").factory("shareVarsBetweenCtrl", [shareVarsBetweenCtrl]);