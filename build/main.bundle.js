/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _models = __webpack_require__(1);

var config = __webpack_require__(2);

var geoCode = function geoCode(location) {
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Date.now();

    var api_key = config.GOOGLE_API_KEY;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: location,
            key: api_key
        }
    }).then(function (response) {
        var formattedAddr = response.data.results[0].formatted_address;
        var formattedAddrOutput = '\n    <h2> Current Search Location: </h2>\n    <ul class="list-group">\n    <li class="list-group-item">\n    ' + formattedAddr + '\n    </li>\n    </ul>\n    ';
        var addressComponents = response.data.results[0].address_components;
        var lat = Math.round(response.data.results[0].geometry.location.lat * 10000) / 10000;
        var lng = Math.round(response.data.results[0].geometry.location.lng * 10000) / 10000;
        var geometryOutput = '\n    <ul class="list-group">\n    <li class="list-group-item">\n    <strong>\n    Latitude\n    </strong>: ' + lat + '\n    </li>\n    <li class="list-group-item">\n    <strong>\n    Longitude\n    </strong>: ' + lng + '\n    </li>\n    </ul>\n    <br>\n    ';
        document.getElementById('formatted-address').innerHTML = formattedAddrOutput;
        document.getElementById('geometry-component').innerHTML = geometryOutput;

        darkSky(lat, lng, time);
        updateHistory(formattedAddr, time);
    });
};

var darkSky = function darkSky(lat, lng) {
    var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Date.now();

    var api_key = config.DARKSKY_API_KEY;
    var apiCall = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a467fea14c1e42d510075082c4e8013a/40.7128,-74.0059';
    axios.get(apiCall, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }).then(function (response) {
        var currentDate = response.data.currently;
        var WeeklyDateArry = response.data.daily.data;
        createWeeklyReportTable(WeeklyDateArry);
        createTodayReportTable(currentDate);
    }).catch(function (error) {
        console.log(error);
        var alert = '\n        <div class="alert alert-danger" role="alert">\n        <strong>' + error + '</strong>\n        </div>\n        ';
        document.getElementById('weeklyWeather-component').insertAdjacentHTML("afterbegin", alert);
    });
};
var createWeeklyReportTable = function createWeeklyReportTable(data) {
    var weeklyReport = [];
    var formattedTime = void 0;
    for (var _i = 0; _i < data.length; _i++) {
        formattedTime = convertToDateTime(data[_i].time);
        var dayReport = weeklyReport[_i] = new _models.foreCastReport(formattedTime, data[_i].humidity, data[_i].precipProbability, data[_i].precipIntensity, data[_i].windSpeed, data[_i].temperatureMax, data[_i].temperatureMin);
    };
    var columnNames = '';
    var units = ['', '%', '%', '(mm/hr)', '(m/s)', '(`C)', '(`C)'];
    var counter = 0;
    for (property in weeklyReport[0]) {
        columnNames += '\n        <th>\n        ' + property + units[counter] + '\n        </th>\n        ';
        counter++;
    };

    var itemRows = '';
    var reportForTheDay = void 0;
    for (var i = 0; i < weeklyReport.length; i++) {
        reportForTheDay = weeklyReport[i];
        itemRows += '\n        <tr>\n        <th scope="row">' + reportForTheDay.Time + '</th>\n        <td>' + reportForTheDay.Humidity + '</td>\n        <td>' + reportForTheDay.Precipitation + '</td>\n        <td>' + reportForTheDay.Intensity + '</td>\n        <td>' + reportForTheDay.Wind + '</td>\n        <td>' + reportForTheDay.MaxTemperature + '</td>\n        <td>' + reportForTheDay.MinTemperature + '</td>\n        </tr>';
    };

    var tableOutput = '\n    <h2> Upcoming Forecasts </h2>\n    <table class="table">\n    <thead class="thead-inverse" id="table-index"> \n    ' + columnNames + '\n    </thead>\n    <tbody>\n    ' + itemRows + '\n    </tbody>\n    </table>\n    ';
    document.getElementById('weeklyWeather-component').innerHTML = tableOutput;
};

var createTodayReportTable = function createTodayReportTable(data) {
    console.log(data);
    var formattedTime = convertToDateTime(data.time);
    var dayReport = new _models.todayReport(formattedTime, data.summary, data.humidity, data.temperature, data.precipProbability, data.precipIntensity, data.windSpeed);

    var units = ['', '', '', '`C', '%', '%', 'm/s'];
    var reportOutput = '';
    var counter = 0;
    for (property in dayReport) {
        reportOutput += '\n        <li class="list-group-item">\n        <strong>\n        ' + property + '\n        </strong>: ' + dayReport[property] + ' ' + units[counter] + '\n        </li>\n        ';
        counter++;
    }
    ;

    var fullReportOutput = '\n    <h2>Today Weather Report </h2>\n    <ul class="list-group"></ul>\n    ' + reportOutput + '\n    </ul>\n    <br>\n    ';

    document.getElementById('dailyWeather-component').innerHTML = fullReportOutput;
};

var convertToDateTime = function convertToDateTime(time) {
    var date = new Date(time * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    year = date.getFullYear();
    month = months[date.getMonth()];
    numDate = date.getDate();
    formattedTime = numDate + ' ' + month + ' ' + year;
    return formattedTime;
};

var convertToUnixTime = function convertToUnixTime(time) {
    return Date.parse(time) / 1000;
};
var updateHistory = function updateHistory(location, time) {
    var formattedTime = convertToDateTime(time);

    var itemRows = '';
    itemRows += '\n    <tr>\n    <td>' + location + '</td>\n    <td>' + formattedTime + '</td>\n    </tr>';

    var table = document.getElementById('history-table');
    if (table.childElementCount >= 5) {
        table.removeChild(table.firstElementChild);
    };
    document.getElementById('history-table').insertAdjacentHTML("afterbegin", itemRows);
};

document.getElementById('location-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var location = document.getElementById('location-input').value;
    var date = document.getElementById('date-input').value;
    if (date !== null) {
        var unixTime = convertToUnixTime(date);
        geoCode(location, unixTime);
    } else {
        geoCode(location);
    };
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var foreCastReport = exports.foreCastReport = function foreCastReport(Date, Humidity, Precipitation, Intensity, Wind, MaxTemperature, MinTemperature) {
    _classCallCheck(this, foreCastReport);

    this.Date = Date;
    this.Humidity = Humidity;
    this.Precipitation = Precipitation;
    this.Intensity = Intensity;
    this.Wind = Wind;
    this.MaxTemperature = MaxTemperature;
    this.MinTemperature = MinTemperature;
};

;

var todayReport = exports.todayReport = function todayReport(Date, Summary, Humidity, Temperature, Precipitation, Intensity, Wind) {
    _classCallCheck(this, todayReport);

    this.Date = Date;
    this.Summary = Summary;
    this.Humidity = Humidity;
    this.Temperature = Temperature;
    this.Precipitation = Precipitation;
    this.Intensity = Intensity;
    this.Wind = Wind;
};

;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = exports.config = {
    DARKSKY_API_KEY: 'a467fea14c1e42d510075082c4e8013a',
    GOOGLE_API_KEY: 'AIzaSyAkYBjwd7ygcP8GpAz47QsP3s3vaweLAE0'
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map