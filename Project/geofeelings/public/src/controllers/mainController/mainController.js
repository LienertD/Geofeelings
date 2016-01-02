/**
 * Created by Jonatan on 21/11/2015.
 */

(function () {
    "use strict";

    var mainController = function ($scope, googleMapsService, shareService, profileService, $location, $routeParams) {

        //chat start
        /*
         * TO DO CHAT:
         * socketids in database?
         * berichten in database?
         * melding als ze niet in de chat zitten en wel bericht krijgen?
         * sendmsgto server in usercontroller?
         * chatmsg naar alle socketids sturen
         *
         * */
        var socket = io.connect("http://localhost:3001");
        $scope.chatMessages = [];


        $scope.init = function () {
            console.log("nu in de init");
            profileService.getUser(function (err, userData) { //zend je id naar de server om te zeggen dat je er bent en welk socketid je hebt
                if (!err) {
                    if (userData.redirect) {
                        //user niet logged in, nog toevoegen dat hij zen id stuurt bij inloggen!
                    } else {
                        socket.emit("statusMessage", userData.id);
                    }
                } else {
                    console.log("error while getting user: " + err);
                }
            });
        };

        socket.on("chatMessage", function (data) { //ontvangen bericht
            newTextBubble(data.senderUsername, data.text, data.receiver, "other");
            $scope.chatMessages.push({text: data.text, sender: data.senderUsernamen, cssClass: "other"});
            $scope.$apply(); //dit zorgt ervoor dat de chatbubbles er direct komen, niet verplaatsen!
        });

        var newTextBubble = function (sender, message, receiver, messageSource) {
            if (messageSource === "me") {
                $scope.chatMessages.push({text: message, sender: sender, cssClass: messageSource});
            }
            console.log($scope.chatMessages);
            console.log(messageSource + ": " + sender + " to " + receiver + ": " + message);
        };

        $scope.sendChatMsgToServer = function () { //verzenden bericht
            profileService.getUser(function (err, userData) {
                if (!err) {
                    if (userData.redirect) { //user is nog niet ingelogd bij het chatten
                        shareVarsBetweenCtrl.setExtraLoginInfo("You need to be logged in to chat.");
                        $location.path(userData.redirect);
                    } else {
                        var inputtext = document.getElementById("inputTextChat");

                        var messageObj = {
                            text: inputtext.value,
                            sender: userData.id,
                            receiver: $routeParams.param,
                            senderUsername: userData.username
                        };

                        socket.emit("chatMessage", messageObj);

                        newTextBubble(userData.username, inputtext.value, $routeParams.param, "me");
                        inputtext.value = "";
                    }
                } else {
                    console.log("error while getting user: " + err);
                }
            });
        };

        //chat einde

        shareService.getAllShares(function (err, shares) {
            if (!err) {
                googleMapsService.showLocationOnMap();
                $scope.shares = shares;
                $scope.timelapse = 0;
                $scope.timestamp = "last hour";
            } else {
                throw new ShareServiceException(err);
            }
        });

        $scope.$watch("timelapse", function () {
            if ($scope.timelapse == 100) {
                $scope.timestamp = "All time";
                googleMapsService.removeMarkers();
                googleMapsService.showAllMarkers(filterSharesOnTime("all"));
            } else if ($scope.timelapse == 80) {
                $scope.timestamp = "Last year";
                googleMapsService.removeMarkers();
                googleMapsService.showAllMarkers(filterSharesOnTime("year"));
            } else if ($scope.timelapse == 60) {
                $scope.timestamp = "Last month";
                googleMapsService.removeMarkers();
                googleMapsService.showAllMarkers(filterSharesOnTime("month"));
            } else if ($scope.timelapse == 40) {
                $scope.timestamp = "Last week";
                googleMapsService.removeMarkers();
                googleMapsService.showAllMarkers(filterSharesOnTime("week"));
            } else if ($scope.timelapse == 20) {
                $scope.timestamp = "Last day";
                googleMapsService.removeMarkers();
                googleMapsService.showAllMarkers(filterSharesOnTime("day"));
            } else if ($scope.timelapse === 0) {
                $scope.timestamp = "last hour";
                googleMapsService.removeMarkers();
                googleMapsService.showAllMarkers(filterSharesOnTime("hour"));
            }
        });

        var filterSharesOnTime = function (time) {
            var shares = [];

            switch (time) {
                case "all":
                    return $scope.shares;
                case "year":
                    angular.forEach($scope.shares, function (share) {
                        console.log(new Date().getYear() - new Date(share.time).getYear());
                        if ((new Date().getYear() - new Date(share.time).getYear()) <= 1)
                            shares.push(share);
                    });
                    return shares;
                case "month":
                    angular.forEach($scope.shares, function (share) {
                        if ((new Date().getMonth() - new Date(share.time).getMonth()) <= 1)
                            shares.push(share);
                    });
                    return shares;
                case "week":
                    angular.forEach($scope.shares, function (share) {
                        if ((new Date().getDay() - new Date(share.time).getDay()) <= 7)
                            shares.push(share);
                    });
                    return shares;
                case "day":
                    angular.forEach($scope.shares, function (share) {
                        if ((new Date().getDay() - new Date(share.time).getDay()) <= 1)
                            shares.push(share);
                    });
                    return shares;
                case "hour":
                    angular.forEach($scope.shares, function (share) {
                        if ((new Date().getTime() - new Date(share.time).getTime()) <= 360000)
                            shares.push(share);
                    });
                    return shares;
            }
        };
    };

    angular.module("geofeelings").controller("mainController", ["$scope", "googleMapsService", "shareService", "profileService", "$location", "$routeParams", mainController]);
})();