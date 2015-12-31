/**
 * Created by Jonatan on 26/11/2015.
 */

(function () {
    "use strict";

    var loginController = function ($scope, $http, $location, shareVarsBetweenCtrl, shareService, profileService) {
        if(shareVarsBetweenCtrl.getExtraLoginInfo()){
            $scope.extraLoginInfo = shareVarsBetweenCtrl.getExtraLoginInfo();
        }

        var postUserlessShare = function(){
            var shareData = shareVarsBetweenCtrl.returnUserlessShare();
            profileService.getUser(function (err, user) {
                if (!err) {
                    if (user.redirect) {
                        $location.path(user.redirect);
                    } else {
                        shareData.userid = user.id;

                        shareService.postShareAsync(shareData, function (err, resShareData) {
                            if (!err) {
                                shareVarsBetweenCtrl.setExtraLoginInfo("");
                                shareVarsBetweenCtrl.setProperty(resShareData);
                                $location.path("/intro_shared");
                            }
                            else {
                                console.log(err);
                            }
                        }); //post de share met de inlogdata dat hij nu weet
                        shareVarsBetweenCtrl.saveUserlessShare("");
                    }
                } else {
                    console.log("> error profileService: " + err);
                }
            });
        };

        //Moet nog naar een service omgezet worden
        $scope.login = function () {
            $http.post('http://localhost:3000/auth/login', {
                username: $scope.username,
                password: $scope.password
            }).success(function (data) {
                $scope.error = data.error;
                if (shareVarsBetweenCtrl.returnUserlessShare() !== undefined && shareVarsBetweenCtrl.returnUserlessShare() !== "") //user heeft willen sharen, maar was niet ingelogd.
                {
                    postUserlessShare();
                }
                else {
                    $location.path(data.redirect);
                }
            });
        };

        //Moet nog naar een service omgezet worden
        $scope.register = function () {
            $http.post('http://localhost:3000/auth/register', {
                username: $scope.username,
                password: $scope.password,
                email: $scope.email
            }).success(function (data) {
                $scope.error = data.error;
                if (shareVarsBetweenCtrl.returnUserlessShare() !== undefined && shareVarsBetweenCtrl.returnUserlessShare() !== "") //user heeft willen sharen, maar was niet ingelogd.
                {
                    postUserlessShare();
                }
                else {
                    $location.path(data.redirect);
                }
            });
        };
    };

    angular.module("geofeelings").controller("loginController", ["$scope", "$http", "$location", "shareVarsBetweenCtrl", "shareService", "profileService", loginController]);
})();