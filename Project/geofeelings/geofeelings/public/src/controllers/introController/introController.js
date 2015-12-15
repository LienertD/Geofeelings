/**
 * Created by Jonatan on 1/12/2015.
 */

(function () {
    "use strict";

    var introController = function ($scope) {

        $scope.sliderValue = 50;
        $scope.moodWord = null;

        //SMILEY TEKENEN
        var c = document.getElementById("smileyCanvas");
        var ctx = c.getContext("2d");
        //telkens slidervalue verandert gezichtje tekenen
        $scope.$watch("sliderValue", function (newValue, oldValue) {
            ctx.clearRect(0, 0, c.width, c.height); //canvas clearen voor nieuw frame

            var mood = $scope.sliderValue;
            giveMoodWord();
            //offset positie mond
            var offsetX = 60;
            var offSetY = 140 + (mood / 5);

            //variabelen voor beziercurve (= mond)
            var SPx = offsetX;
            var SPy = offSetY + 100 - (mood / 10 * 8);
            var H1x = offsetX;
            var H1y = offSetY + (mood / 10 * 12);
            var H2x = offsetX + 180;
            var H2y = offSetY + (mood / 10 * 12);
            var EPx = offsetX + 180;
            var EPy = offSetY + 100 - (mood / 10 * 8);

            //rood en groen bereken voor achtergrond hoofd
            var bgR = Math.round(170 - (mood / 100) * 170);
            var bgG = Math.round(mood / 100 * 132);

            //hoofd
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.arc(c.width / 2, c.height / 2, 145, 0, 2 * Math.PI);
            ctx.fillStyle = "rgb(" + bgR + "," + bgG + ",0)";
            ctx.fill();
            ctx.stroke();

            //mond

            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(SPx, SPy);
            ctx.bezierCurveTo(H1x, H1y, H2x, H2y, EPx, EPy);
            ctx.stroke();
            ctx.lineCap = "round";

            //oog links

            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.arc(100, 100, 20, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();
            ctx.stroke();

            //oog rechts
            ctx.beginPath();
            ctx.arc(200, 100, 20, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();
            ctx.stroke();
        });

        var moodwords = ["horrible", "really bad", "bad", "okay", "good", "really good", "excellent"];
        var giveMoodWord = function () {
            if ($scope.sliderValue < 5) {
                $scope.moodWord = moodwords[0];
            }
            else if ($scope.sliderValue < 25) {
                $scope.moodWord = moodwords[1];
            }
            else if ($scope.sliderValue < 40) {
                $scope.moodWord = moodwords[2];
            }
            else if ($scope.sliderValue < 60) {
                $scope.moodWord = moodwords[3];
            }
            else if ($scope.sliderValue < 75) {
                $scope.moodWord = moodwords[4];
            }
            else if ($scope.sliderValue < 95) {
                $scope.moodWord = moodwords[5];
            }
            else {
                $scope.moodWord = moodwords[6];
            }
        }
    };

    angular.module("geofeelings").controller("introController", ["$scope", introController]);
})();