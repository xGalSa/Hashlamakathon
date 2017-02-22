myApp.controller("tableController", function ($scope) {
    
    var tableTitles = [
      'נהג',
      'מס\' רכב',  
      'מוצא',  
      'יעד',  
      'ק\"מ מיציאה',  
      'ק\"מ בסיום',  
      'זמן יציאה',  
      'זמן הגעה'
    ];
    var placeHolder = [{
      "name":"אורי פריש",
      "vNum":"77-99-488",  
      "from":"אשקלון",  
      "to":"כפר סבא",  
      "startKm":"26.7",  
      "endKm":"25",  
      "exitTime":"10:15",  
      "arrivalTime":"13:14"
    },
                       {
      "name":"אורי",
      "vNum":"77-16-488",  
      "from":"חדרה",  
      "to":"כפר סבא",  
      "startKm":"26.4",  
      "endKm":"25",  
      "exitTime":"10:15",  
      "arrivalTime":"13:14"
    },
                     {
      "name":"asd",
      "vNum":"asd",  
      "from":"asd",  
      "to":"asd",  
      "startKm":"asd",  
      "endKm":"asd",  
      "exitTime":"asd",  
      "arrivalTime":"asd"
    }];
    
    $scope.titles = tableTitles;
    $scope.drives = placeHolder;
    
    return $scope.drives;
});