var myApp = angular.module("myApp", ['ngRoute']);
myApp.controller('MyController', ['$scope', '$location', '$timeout', '$q', function ($scope, $location, $timeout, $q) {
    $scope.personalNumber = '';
    $scope.signIn = function () {
        var reg = /^(\d+){7}$/;
        var p = (RegExp(reg));
        
        // the personal number check
        if (p.test($scope.personalNumber)) {
            document.getElementById('slider').classList.toggle('closed');
            $timeout(function () {
                var promise = getName($scope.personalNumber);
                
                promise.then(function (name) {
                    x = name;
                    alert(x);
                    $location.url("/getDetails/" + x);
                }, function (error) {
                    x = error;
                });
                var x = getName($scope.personalNumber);
            }, 1000);
        }
        else {
            sweetAlert("אופס", "טעית במספר האישי.. ", "error");
        }
    };

    function getName(personalNumber) {
        return $q(function (resolve, reject) {
            $.ajax({
                method: 'GET'
                , contentType: "application/json"
                , url: "http://10.17.1.70/user/" + personalNumber
                , context: document.body
                , success: function (result) {
                    resolve(result);
                }
                , error: function (result) {
                    sweetAlert("אופס", "אולי אתה לא נהג? ", "error");
                    reject(false);
                }
            })
        });
    }
            }]);
myApp.controller('MainController', function ($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}).config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'html/login.html'
        , controller: 'MyController'
    }).when('/getDetails/:name', {
        templateUrl: 'html/form.html'
        , controller: 'MyController'
    });
});