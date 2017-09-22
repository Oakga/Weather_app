let geoCode = (location) => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
        address: location,
        key: 'AIzaSyAkYBjwd7ygcP8GpAz47QsP3s3vaweLAE0'
    }
}).then(function(response){
    console.log(response);
    const formattedAddr = response.data.results[0].formatted_address;
    const formattedAddrOutput = `
    <ul class="list-group">
    <li class="list-group-item">
    ${formattedAddr}
    </li>
    </ul>
    `;
    let addressComponents = response.data.results[0].address_components;
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;

    
    let geometryOutput = `
    <ul class="list-group">
    <li class="list-group-item">
    <strong>
    Latitude
    </strong>: ${lat}
    </li>
    <li class="list-group-item">
    <strong>
    Longitude
    </strong>: ${lng}
    </li>
    </ul>
    `;
    document.getElementById('formatted-address').innerHTML = formattedAddrOutput;
    document.getElementById('geometry-component').innerHTML = geometryOutput;
    
    
})
.catch(function(error){
    const formattedAddrOutput = `
    <ul class="list-group">
    <li class="list-group-item">
    Unknown location
    </li>
    </ul>
    `;
    document.getElementById('formatted-address').innerHTML = formattedAddrOutput;
})
};

document.getElementById('location-form').addEventListener('submit', function (e){
    e.preventDefault();
    let location = document.getElementById('location-input').value;
    geoCode(location);
});


