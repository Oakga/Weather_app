const createWeeklyReportTable = (data) => {
    let weeklyReport = [];
    let formattedTime;
    for(let i=0;i<data.length;i++){
        formattedTime= convertToDateTime(data[i].time);
        const dayReport = weeklyReport[i] = new foreCastReport(
            formattedTime,
            Math.round(data[i].humidity*100),
            Math.round(data[i].precipProbability*100),
            data[i].precipIntensity,
            data[i].windSpeed,
            data[i].temperatureMax,
            data[i].temperatureMin,
        );
    };
    let columnNames = ``;
    const units = ['','','','(mm/hr)','(m/s)','(`C)','(`C)'];
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
        <th scope="row">${reportForTheDay.Date}</th>
        <td>${reportForTheDay.Humidity}%</td>
        <td>${reportForTheDay.Precipitation}%</td>
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
    document.getElementById('weeklyWeather-component').innerHTML = tableOutput;
    const series = weeklyReport.map(function(item) { return item["Humidity"]; });
    updateChart(series,"Humidity");
};

const createTodayReportTable = (data) => {
    let formattedTime = convertToDateTime(data.time);
        const dayReport = new todayReport(
            formattedTime,
            data.summary,
            Math.round(data.humidity*100),
            data.temperature,
            Math.round(data.precipProbability*100),
            data.precipIntensity,
            data.windSpeed,
        );

    const units = ['','','%','`C','%','%','m/s'];
    let reportOutput = ``;
    let counter = 0;
    for( property in dayReport){
        reportOutput+=`
        <li class="list-group-item">
        <strong>
        ${property}
        </strong>: ${dayReport[property]} ${units[counter]}
        </li>
        `;
        counter++;
    }
    ;

    let fullReportOutput = `
    <h2>Today Weather Report </h2>
    <ul class="list-group"></ul>
    ${reportOutput}
    </ul>
    <br>
    `;

    document.getElementById('dailyWeather-component').innerHTML = fullReportOutput;
};