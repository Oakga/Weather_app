'use strict';

var geoCode = function geoCode() {
    var location = 'New York';
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: location,
            key: 'AIzaSyAkYBjwd7ygcP8GpAz47QsP3s3vaweLAE0'
        }
    }).then(function (response) {
        console.log(response);
        var formattedAddr = response.data.results[0].formatted_address;
        var formattedAddrOutput = '\n    <ul class="list-group">\n    <li class="list-group-item">\n    ' + formattedAddr + '\n    </li>\n    </ul>\n    ';
        var addressComponents = response.data.results[0].address_components;
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var addressComponentsOutput = '<ul class="list-group">';
        for (var i = 0; i < addressComponents.length; i++) {
            addressComponentsOutput += '\n        <li class="list-group-item">\n        <strong>\n        ' + addressComponents[i].types[0] + '\n        </strong>: ' + addressComponents[i].long_name + '\n        </li>\n        ';
        }
        addressComponentsOutput += '</ul>';

        var geometryOutput = '\n    <ul class="list-group">\n    <li class="list-group-item">\n    <strong>\n    Latitude\n    </strong>: ' + lat + '\n    </li>\n    <li class="list-group-item">\n    <strong>\n    Longitude\n    </strong>: ' + lng + '\n    </li>\n    </ul>\n    ';
        document.getElementById('formatted-address').innerHTML = formattedAddrOutput;
        document.getElementById('address-components').innerHTML = addressComponentsOutput;
        document.getElementById('geometry-component').innerHTML = geometryOutput;
    }).catch(function (error) {
        console.log(error);
    });
};

document.getElementById('locationform').addEventListener('submit', function () {
    geoCode();
});
