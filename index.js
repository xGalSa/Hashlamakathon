var myApp = angular.module("myApp", ['ngRoute']);
myApp.controller('MyController', ['$scope', '$location','$timeout', function ($scope, $location,$timeout) {
    $scope.personalNumber = '';
    var x = this;
    $scope.signIn = function () {
        var reg = /^(\d+){7}$/;
        var p = (RegExp(reg));
        // the personal number check
        if (p.test($scope.personalNumber)) {
            document.getElementById('slider').classList.toggle('closed');
            $timeout(function () {
               $location.path('/getDetails');
                
            }, 1000);
        }
        else {
            sweetAlert("אופס", "טעית במספר האישי.. ", "error");
        }
    };
}]);
myApp.controller('MainController', function ($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}).config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'login.html'
        , controller: 'MyController'
    }).when('/getDetails', {
        templateUrl: 'form.html'
        , controller: 'MyController'
    });
});