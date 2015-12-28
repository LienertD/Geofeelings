/**
 * Created by liene on 28/12/2015.
 */


var shareVarsBetweenCtrl = function () {
    "use strict";

    //private
    var property;
    var userlessShare;

    //public
    return {

        getProperty: function () {
            return property;
        },

        setProperty: function (value) {
            property = value;
        },

        saveUserlessShare: function (data) {
            console.log("in saveuserlessshare");
            console.log(data);
            userlessShare = data;
        },
        returnUserlessShare: function () {
            return userlessShare;
        }
    };
};

angular.module("geofeelings").factory("shareVarsBetweenCtrl", [shareVarsBetweenCtrl]);