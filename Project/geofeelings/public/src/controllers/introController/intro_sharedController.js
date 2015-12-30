/**
 * Created by Lienert on 21/12/2015.
 */

(function () {
    "use strict";

    var intro_sharedController = function ($scope, shareVarsBetweenCtrl,googleMapsService) {



        googleMapsService.convertCoordinatesToAdress(shareVarsBetweenCtrl.getProperty().share.lat, shareVarsBetweenCtrl.getProperty().share.lng, function (err, address) {
            if (!err) {
                console.log(address);
                $scope.infoPostedShare = shareVarsBetweenCtrl.getProperty().share;

            } else {
                cb(err, null);
            }
        });

    };
    angular.module("geofeelings").controller("intro_sharedController", ["$scope", "shareVarsBetweenCtrl","googleMapsService", intro_sharedController]);
})();