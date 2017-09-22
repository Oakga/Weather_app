class foreCastReport {
    constructor(Time,Humidity,Precipitation,Intensity,Wind,MaxTemperature,MinTemperature){
        this.Time = Time;
        this.Humidity = Humidity;
        this.Precipitation = Precipitation;
        this.Intensity = Intensity;
        this.Wind = Wind;
        this.MaxTemperature = MaxTemperature;
        this.MinTemperature = MinTemperature; 
    };
};

class todayReport { 
    constructor(Time,Summary,Humidity,Temperature, Precipitation,Intensity,Wind,){
        this.Time = Time;
        this.Summary = Summary;
        this.Humidity = Humidity;
        this.Temperature = Temperature;
        this.Precipitation = Precipitation;
        this.Intensity = Intensity;
        this.Wind = Wind;
    };
};

const geoCode = (location, time=Date.now()) => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
        address: location,
        key: 'AIzaSyAkYBjwd7ygcP8GpAz47QsP3s3vaweLAE0'
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
.catch(function(error){
    console.log(error);
    const formattedAddrOutput = `
    <div class="alert alert-danger" role="alert">
    <strong>Unknown Location!</strong> Change a few things up and try submitting again.
    </div>
    `;
    document.getElementById('formatted-address').innerHTML = formattedAddrOutput;
})
};
const weeklyWeatherTable = (response) => {
    let weeklyReport = [];
    const currentDate =  response.data.currently;
    const dailyDate = response.data.daily.data;
    let formattedTime;
    for(let i=0;i<dailyDate.length;i++){
        formattedTime= convertToDateTime(dailyDate[i].time);
        const dayReport = weeklyReport[i] = new foreCastReport(
            formattedTime,
            dailyDate[i].humidity,
            dailyDate[i].precipProbability,
            dailyDate[i].precipIntensity,
            dailyDate[i].windSpeed,
            dailyDate[i].temperatureMax,
            dailyDate[i].temperatureMin,
        );
    };
    let columnNames = ``;
    const units = ['','%','%','(mm/hr)','(m/s)','(`C)','(`C)'];
    let counter = 0;
    for ( property in weeklyReport[0] ) {
        columnNames += `
        <th>
        ${property}${units[counter]}
        </th>
        `;
        counter++;
    };
    
    let itemRows = ``;
    let reportForTheDay;
    for(var i=0;i<weeklyReport.length;i++){
        reportForTheDay=weeklyReport[i];
        itemRows += `
        <tr>
        <th scope="row">${reportForTheDay.Time}</th>
        <td>${reportForTheDay.Humidity}</td>
        <td>${reportForTheDay.Precipitation}</td>
        <td>${reportForTheDay.Intensity}</td>
        <td>${reportForTheDay.Wind}</td>
        <td>${reportForTheDay.MaxTemperature}</td>
        <td>${reportForTheDay.MinTemperature}</td>
        </tr>`
    };
    
    let tableOutput = `
    <h2> Upcoming Forecasts </h2>
    <table class="table">
    <thead class="thead-inverse" id="table-index"> 
    ${columnNames}
    </thead>
    <tbody>
    ${itemRows}
    </tbody>
    </table>
    `;      
    document.getElementById('weather-component').innerHTML = tableOutput;
};
const darkSky = (lat, lng, date = Date.now()) => {
    let apiCall = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c84a2f187efcca194054935abae32b10/'+lat+','+lng;
    axios.get(apiCall,{
        params: {
            exclude: '[hourly,flags]',
            time: date,
            unit: '[si]',
        }
    }).then(function(response){
        weeklyWeatherTable(response);
    })
    .catch(function(error){
        console.log(error);
        const alert = `
        <div class="alert alert-danger" role="alert">
        <strong>Cannot find Weather information!</strong> Change a few things up and try submitting again.
        </div>
        `;
        document.getElementById('weather-component').insertAdjacentHTML("afterbegin",alert);
    })
    ;
}

const convertToDateTime = (time) => {
    let date = new Date(time*1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    year = date.getFullYear();
    month = months[date.getMonth()];
    numDate = date.getDate();
    formattedTime = numDate + ' ' + month + ' ' + year;
    return formattedTime;
};

const convertToUnixTime = (time) => {
    return Date.parse(time)/1000;
}
const updateHistory = (location,time) => {
    const formattedTime = convertToDateTime(time);
    
    let itemRows = ``;
    itemRows += `
    <tr>
    <td>${location}</td>
    <td>${formattedTime}</td>
    </tr>`;


    const table = document.getElementById('history-table');
    if(table.childElementCount>=5){
        table.removeChild(table.firstElementChild);
    };


    document.getElementById('history-table').insertAdjacentHTML("afterbegin",itemRows);
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
document.addEventListener("DOMContentLoaded", function(event) { 
    document.getElementById('location-form').submit;
});

