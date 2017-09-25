'use strict';
class foreCastReport {
    constructor(Date,Humidity,Precipitation,Intensity,Wind,MaxTemperature,MinTemperature){
        this.Date = Date;
        this.Humidity = Humidity;
        this.Precipitation = Precipitation;
        this.Intensity = Intensity;
        this.Wind = Wind;
        this.MaxTemperature = MaxTemperature;
        this.MinTemperature = MinTemperature; 
    };
};
module.exports = foreCastReport;

class todayReport { 
    constructor(Date,Summary,Humidity,Temperature, Precipitation,Intensity,Wind,){
        this.Date = Date;
        this.Summary = Summary;
        this.Humidity = Humidity;
        this.Temperature = Temperature;
        this.Precipitation = Precipitation;
        this.Intensity = Intensity;
        this.Wind = Wind;
    };
};
module.exports = todayReport;