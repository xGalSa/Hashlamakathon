var myApp = angular.module("myApp", ['ngRoute']);
myApp.controller("menuCtrl", ['$scope', '$location', function ($scope, $location) {
    $scope.first = localStorage.getItem("firstName");
    $scope.last = localStorage.getItem("lastName");
}]);
myApp.controller("formController", ['$scope', '$location', function ($scope, $location) {
    var d = new Date();
    $scope.first = localStorage.getItem("firstName");
    $scope.last = localStorage.getItem("lastName");
    /*
'vehicle_number', 'driverID', 'source', 'destination', 'start_mileage', 'approx_mileage', 'approx_time'

*/
    
   
    
    $scope.go = function () {
        var str = "נסיעה מ" + window.from + " ל" + window.to + "\n";
        str += " אנחנו משערים שתיסע כ " + ((window.distance) / 1000).toFixed(1) + " קילומטרים ";
        str += " וזה ייקח לך" + ((window.duration) / 60 / 60).toFixed(2) + " שעות\n";
        str += " נסיעה נעימה! "
        jsonToSend = {
            "vehicle_number": 123456
            , "driverID": '8087677'
            , "source": window.from
            , "destination": window.to
            , "start_mileage": 15000
            , "approx_mileage": (window.distance.toFixed(1))
            , "approx_time": ((window.duration) / 60 / 60).toFixed(2)
        };
        document.getElementById("details").innerText = str;
        $('#myModal').on('hidden.bs.modal', function () {
            location.replace(location.origin + "/client/index.html#/finishDrive");
            //  $location.url("/finishDrive");
        })
    };
}]);
myApp.controller('MyController', ['$scope', '$location', '$timeout', '$q', function ($scope, $location, $timeout, $q) {
    $scope.details = '';
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
                    $location.url("/menu/path?first_name=" + x["first_name"] + "&last_name=" + x["last_name"]);
                    if (typeof (Storage) !== "undefined") {
                        localStorage.setItem("firstName", x["first_name"]);
                        localStorage.setItem("lastName", x["last_name"]);
                    }
                    else {
                        // Sorry! No Web Storage support..
                    }
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
    }).when('/menu/:name', {
        templateUrl: 'html/menu.html'
        , controller: 'menuCtrl'
    }).when('/getDetails', {
        templateUrl: 'html/Destination.html'
        , controller: 'formController'
    }).when('/finishDrive', {
        templateUrl: 'html/finish.html'
        , controller: 'formController'
    }).when('/drives', {
        templateUrl: 'html/drives.html'
        , controller: 'formController'
    });
});