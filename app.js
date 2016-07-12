var module = angular.module("app", ['ngMaterial']);
module.directive("progressbar", function() {
    return {
        restrict: "A",
        scope: {
            total: "=",
            current: "="
        },
        link: function(scope, element) {

            scope.$watch("current", function(value) {
                element.css("width", scope.current / scope.total * 100 + "%");
            });
            scope.$watch("total", function(value) {
                element.css("width", scope.current / scope.total * 100 + "%");
            })
        }
    };
});

module.controller('appController', function($scope, $mdDialog) {
    $scope.myCurrent = 0;
    $scope.totalAmount = 1000;
    $scope.donationAmount = 50;
    $scope.rest_amount = $scope.totalAmount - parseInt($scope.myCurrent);
    $scope.addCost = function() {
        if (parseInt($scope.myCurrent) < $scope.totalAmount) {
            $scope.myCurrent = $scope.myCurrent + $scope.donationAmount;
            $scope.rest_amount = $scope.totalAmount - parseInt($scope.myCurrent);
            if ($scope.rest_amount < 0) {
                $scope.rest_amount = 0;
                $scope.myCurrent = $scope.totalAmount;
            }
        }
    };

    $scope.showAlert = function(ev) {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('This is an alert message')
            .textContent('Saved for future ')
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
        );
    };

    $scope.postTweet = function() {
        var left = (screen.width / 2) - 250;
        var top = (screen.height / 2) - 150;
        console.log(left, top);
        var textToTweet = " i just donated  "+ $scope.myCurrent + "$";
        if (textToTweet.length > 140) {
            alert('Tweet should be less than 140 Chars');
        } else {
            var twtLink = 'http://twitter.com/home?status=' + encodeURIComponent(textToTweet);
            window.open(twtLink, 'popup', 'width=500,height=300,scrollbars=no,resizable=no,top=' + top + ',left=' + left);
        }
    };

    $(document).ready(function(e) {
        $(".progress").tooltip();
    });
});