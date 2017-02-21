        var placeSearch, autocomplete;
        var componentForm = {
            street_number: 'short_name'
            , route: 'long_name'
            , locality: 'long_name'
            , administrative_area_level_1: 'short_name'
            , country: 'long_name'
            , postal_code: 'short_name'
        };

        function initAutocomplete() {
            // Create the autocomplete object, restricting the search to geographical
            // location types.
            autocomplete = new google.maps.places.Autocomplete(
                (document.getElementById('autocomplete')), {
                    types: ['geocode']
                });
            // When the user selects an address from the dropdown, populate the address
            // fields in the form.
            autocomplete.addListener('place_changed', fillInAddress);
        }

        function fillInAddress() {
            // Get the place details from the autocomplete object.
            place = autocomplete.getPlace();
            var service = new google.maps.DistanceMatrixService();
            var origin = new google.maps.LatLng(geolocation.lat, geolocation.lng);
            var destination = place.formatted_address;
            service.getDistanceMatrix({
                origins: [origin]
                , destinations: [destination]
                , travelMode: 'DRIVING'
                , unitSystem: google.maps.UnitSystem.METRIC
                , avoidHighways: true
                , avoidTolls: true
            , }, callback);
        }

        function callback(response, status) {
            if (status == 'OK') {
                var origins = response.originAddresses;
                var destinations = response.destinationAddresses;
                var distance = response.rows[0].elements[0].distance.value; // distance in meters
                var duration = response.rows[0].elements[0].duration.value; //seconds
                var from = origins[0];
                var to = destinations[0];
            }
        }

        // Bias the autocomplete object to the user's geographical location,
        // as supplied by the browser's 'navigator.geolocation' object.
        function geolocate() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    geolocation = {
                        lat: position.coords.latitude
                        , lng: position.coords.longitude
                    };
                    var circle = new google.maps.Circle({
                        center: geolocation
                        , radius: position.coords.accuracy
                    });
                    autocomplete.setBounds(circle.getBounds());
                });
            }
        }