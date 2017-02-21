var myApp = angular.module("myApp", ['ngRoute']);



myApp.controller('MyController', ['$scope', '$location', '$timeout', '$q', function ($scope, $location, $timeout, $q) {
   
    // Enter
    document.getElementById("personalNumber").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("go").click();
    }
});
    
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
                    x = JSON.parse(name);
                    $location.url("/getDetails/path?first_name=" + x["first_name"] + "&last_name=" + x["last_name"]);
                }, function (error) {
                    document.getElementById('slider').classList.toggle('closed');
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
                , dataType: 'json'
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
        templateUrl: 'html/menu.html'
        , controller: 'MyController'
    });
});