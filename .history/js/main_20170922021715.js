let geoCode = (location) => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
        address: location,
        key: 'AIzaSyAkYBjwd7ygcP8GpAz47QsP3s3vaweLAE0'
    }
}).then(function(response){
    const formattedAddr = response.data.results[0].formatted_address;
    const formattedAddrOutput = `
            <ul class="list-group">
            <li class="list-group-item">
            ${formattedAddr}
            </li>
            </ul>
            `;
    let addressComponents = response.data.results[0].address_components;
    let lat = Math.round(response.data.results[0].geometry.location.lat*10000)/10000;
    let lng = Math.round(response.data.results[0].geometry.location.lng*10000)/10000;
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
    
    darkSky(lat,lng);
    
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

let darkSky = (lat, lng, date = Date.now()) => {
    let apiCall = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c84a2f187efcca194054935abae32b10/'+lat+','+lng;
    axios.get(apiCall,{
        params: {
            exclude: '[hourly,flags]',
            time: date
        }
    }).then(function(response){
        var currentDate =  response.data.currently;
        console.log(currentDate);
    })
    .catch(function(error){
        console.log(error);
    })
    ;
}


document.getElementById('location-form').addEventListener('submit', function (e){
    e.preventDefault();
    let location = document.getElementById('location-input').value;
    geoCode(location);
    
});


