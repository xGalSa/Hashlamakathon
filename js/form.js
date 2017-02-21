"use strict";
myApp.controller("menuCtrl", ['$scope', '$location', function ($scope, $location) {
    $scope.first = localStorage.getItem("firstName");
    $scope.last = localStorage.getItem("lastName");
}]);
myApp.controller("formController", ['$scope', '$location', function ($scope, $location) {
    $scope.first = localStorage.getItem("firstName");
    $scope.last = localStorage.getItem("lastName");
}]);