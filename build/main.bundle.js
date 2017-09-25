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

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map