const geoCode = (location, time=Date.now()) => {
    const api_key = config.GOOGLE_API_KEY;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
        address: location,
        key: api_key,
    }
}).then(function(response){
    const formattedAddr = response.data.results[0].formatted_address;
    const formattedAddrOutput = `
    <h2> Current Search Location: </h2>
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
    <br>
    `;
    document.getElementById('formatted-address').innerHTML = formattedAddrOutput;
    document.getElementById('geometry-component').innerHTML = geometryOutput;
    
    darkSky(lat,lng,time);
    updateHistory(formattedAddr,time);
})
};

const darkSky = (lat, lng, date = Date.now()) => {
    const api_key = config.DARKSKY_API_KEY;
    let apiCall = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a467fea14c1e42d510075082c4e8013a/40.7128,-74.0059`;
    axios.get(apiCall,{
        headers: {
            'X-Requested-With': 'XMLHttpRequest',            
        },
    }).then(function(response){
        const currentDate =  response.data.currently;
        const WeeklyDateArry = response.data.daily.data;
        createWeeklyReportTable(WeeklyDateArry);
        createTodayReportTable(currentDate);
    })
    .catch(function(error){
        console.log(error);
        const alert = `
        <div class="alert alert-danger" role="alert">
        <strong>${error}</strong>
        </div>
        `;
        document.getElementById('weeklyWeather-component').insertAdjacentHTML("afterbegin",alert);
    })
    ;
};

document.getElementById('location-form').addEventListener('submit', function (e){
    e.preventDefault();
    const location = document.getElementById('location-input').value;
    const date = document.getElementById('date-input').value;
    if(date!==null){
        const unixTime = convertToUnixTime(date);
        geoCode(location,unixTime);
    }
    else {
        geoCode(location);
    };
});