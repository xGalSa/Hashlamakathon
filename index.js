var myApp = angular.module("myApp", ['ngRoute']);
myApp.controller('MyController', ['$scope', '$location', function ($scope, $location) {
    $scope.personalNumber = '';
    $scope.signIn = function () {
        var reg = /^(\d+)[7]$/;
        var p = (RegExp(reg));
        if (p.test($scope.personalNumber)) {
           // document.getElementById('slider').classList.toggle('closed');
            
           // setTimeout(function () {         }, 5000);
            
            $location.path('/getDetails')
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