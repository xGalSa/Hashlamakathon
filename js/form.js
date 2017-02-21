"use strict";

myApp.controller("formController",['$scope', '$location', function($scope,$location){
    
    
    var searchObject = $location.search();
   
    $scope.first =  searchObject["first_name"];
    
    $scope.last =  searchObject["last_name"];
}]);