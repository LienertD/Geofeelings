/**
 * Created by Lienert on 21/12/2015.
 */

(function () {
    "use strict";

    var intro_sharedController = function ($scope, shareVarsBetweenCtrl,profileService) {
        $scope.infoPostedShare = shareVarsBetweenCtrl.getProperty().share;
    };
    angular.module("geofeelings").controller("intro_sharedController", ["$scope", "shareVarsBetweenCtrl","profileService", intro_sharedController]);
})();