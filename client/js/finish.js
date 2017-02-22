var map;

function initMap() {
    
    $(".finishDrive").on('click',function(){
        swal("הנסיעה הסתיימה בהצלחה", "", "success");
        
        
    });
     $('#myModal').on('shown.bs.modal', function () {
        google.maps.event.trigger(map, "resize");
    });
    
     var origin = {
        lat: 31.264204
        , lng: 34.814113
    };
    var destination = {
        lat: 31.064718
        , lng: 34.841665
    };
    
    var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
    });
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
        center: origin
        , zoom: 7
        , mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
     // Set destination, origin and travel mode
    var request = {
        destination: destination
        , origin: origin
        , travelMode: 'DRIVING'
    };
    
    var directionsService = new google.maps.DirectionsService();
    
    map = new google.maps.Map(mapCanvas, mapOptions);
    
    directionsService.route(request, function (response, status) {
        if (status == 'OK') {
            // Display the route on the map
            directionsDisplay.setDirections(response);
        }
    });
    
        var geocoder = new google.maps.Geocoder();
//    document.getElementById('submit').addEventListener('click', function () {
//        x = 0;
//        y = 0;
//        geocodeAddress(geocoder, x, y);
//    });
    
   
}
    

/*function geocodeAddress(geocoder, x, y) {
    var address = document.getElementById('address').value; // the address string, for example "Arlozorov 5, Tel-Aviv Yafo, Israel"
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status === 'OK') {
            x = results[0].geometry.location.lat();
            y = results[0].geometry.location.lng();
        }
        else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function initMap() {
   
   
    
   
    // Set destination, origin and travel mode
    var request = {
        destination: destination
        , origin: origin
        , travelMode: 'DRIVING'
    };
    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function (response, status) {
        if (status == 'OK') {
            // Display the route on the map
            directionsDisplay.setDirections(response);
        }
    });
    /*
    var geocoder = new google.maps.Geocoder();
    document.getElementById('submit').addEventListener('click', function () {
        x = 0;
        y = 0;
        geocodeAddress(geocoder, x, y);
    });
}*/