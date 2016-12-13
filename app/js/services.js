'use strict';

/* Services */

angular.module('openWeatherApp.services', ['ngResource'])

 
  .value('version', '0.1.6')


  .value('exampleLocations',['Lima','Huancayo','chaclacayo','Buenos Aires','Brazilia','Caracas'])
  .value('stormLocations',['Lima','Huancayo','chaclacayo','Buenos Aires','Brazilia','Caracas'])
 .factory('openWeatherMap', function($resource) {

    var apiKey = '46c3231cb97608d8d41ff7bc0e370168';
    var apiBaseUrl = 'http://api.openweathermap.org/data/2.5/';
    
    return $resource(apiBaseUrl + ':path/:subPath?q=:location&lang=es',
      {
        APPID: apiKey,
        mode: 'json',
        callback: 'JSON_CALLBACK',
        units: 'metric',
        lang: 'en'
      },
      {
        queryWeather: {
          method: 'JSONP',
          params: {
            path: 'weather'
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        },
        queryForecast: {
          method: 'JSONP',
          params: {
            path: 'forecast'
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        },
        queryForecastDaily: {
          method: 'JSONP',
          params: {
            path: 'forecast',
            subPath: 'daily',
            cnt: 7
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        }
      }
    )
  })


  .factory('Ciudades',function($http){
    var appID="46c3231cb97608d8d41ff7bc0e370168";
   var ciudades={};
     ciudades.getAll=function(){
            
            return $http.get("http://api.openweathermap.org/data/2.5/box/city?bbox=-81,-16,-72,-5,10&cluster=yes&appid="+appID)              
          }
      return ciudades;
  }).
  factory('rayosUV', function($resource) {
    http://api.openweathermap.org/v3/uvi/-15,-77/current.json?appid=943d3a75c72ea297aa73f129275d2140
    var apiKey = '46c3231cb97608d8d41ff7bc0e370168';
    var apiBaseUrl = 'http://api.openweathermap.org/v3/uvi/';
    
    return $resource(apiBaseUrl + ':lon,:lat/:fecha.json?appid='+apiKey,
      {
        APPID: apiKey,
        mode: 'json',
        callback: 'JSON_CALLBACK',
        responseType: "json",
        units: 'metric',
        lang: 'en'
      },
      {
        queryUV: {
          method: 'JSONP',
          isArray: false,
           headers: {
            'x-api-key': apiKey,
            'Access-Control-Allow-Origin':"*"
          }
        },
        queryForecast: {
          method: 'JSONP',
          params: {
            path: 'forecast'
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        },
        queryForecastDaily: {
          method: 'JSONP',
          params: {
            path: 'forecast',
            subPath: 'daily',
            cnt: 7
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        }
      }
    )
  });
