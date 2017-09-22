
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
    <div class="alert alert-danger" role="alert">
    <strong>Unknown Location!</strong> Change a few things up and try submitting again.
    </div>
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
        let weeklyReport = [];
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year, month, day;
        const currentDate =  response.data.currently;
        const dailyDate = response.data.daily;
        for(let i=0;i<dailyDate.data.length;i++){
            let date = new Date(dailyDate.data[i].time*1000);
            year = date.getFullYear();
            month = months[date.getMonth()];
            day = date.getDate();
            formattedTime = date + ' ' + month + ' ' + year;
            const dayReport = weeklyReport[i] = {
                time: formattedTime,
            };
        };
        console.log(weeklyReport);
        // let columnNames = `
        // <th>#</th>
        // `;
        // for ( property in currentDate ) {
        //     columnNames += `
        //     <th>
        //     ${property}
        //     </th>
        //     `;
        // };

        // let rows = ``;
        // let counter= 1;
        // for ( var key in currentDate ) {
        //     rows += `<tr>
        //     <th scope="row">${counter}</th>
        //     <td>${key}</td>
        //     </tr>`;
        //     counter++;
        // };

        // let tableOutput = `
        //     <table class="table">
        //     <thead class="thead-inverse" id="table-index"> 
        //     ${columnNames}
        //     </thead>
        //     <tbody>
        //     ${rows}
        //     </tbody>
        //     </table>
        // `;
        // document.getElementById('weather-component').innerHTML = tableOutput;

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


document.getElementById('location-form').addEventListener('submit', function (e){
    e.preventDefault();
    let location = document.getElementById('location-input').value;
    geoCode(location);
    
});


