'use strict';

/* Controllers */

angular.module('openWeatherApp.controllers', [])

  // Controller for "open weather map" api data search
  .controller('OpenWeatherCtrl',
    ['$scope','$http','$rootScope','exampleLocations','openWeatherMap','stormLocations','ISO3166','Ciudades','rayosUV',
      function($scope,$http,$rootScope,exampleLocations,openWeatherMap,stormLocations,ISO3166,Ciudades,rayosUV) {

    $scope.message = '';
    $scope.hasState = '';

    var datos=[];
    // Expose example locations to $scope
   Ciudades.getAll().then(function(res){
    for(var x=0;x<res.data.list.length;x++){
      datos.push(res.data.list[x].name);
    }
        $scope.exampleLocations = datos;

   });

  ;
    $scope.stormLocations = stormLocations;
    $scope.iconBaseUrl = 'http://openweathermap.org/img/w/';

    $scope.forecast = openWeatherMap.queryForecastDaily({
      location: exampleLocations[ 0 ]
    });
  


       //////////////////////




  var defaultMap = "peruLow";
  var countryMaps = {
    "PE": [ "peruLow" ],
  };

  // calculate which map to be used
  var currentMap = defaultMap;
  var titles = [];
  if ( countryMaps[ "PE"] !== undefined ) {
    currentMap = countryMaps["PE"][ 0 ];


      titles.push( {
        "text": "Peru"
      } );
   

  }

  var map = AmCharts.makeChart( "chartdiv", {
    "type": "map",
    "theme": "light",
    "colorSteps": 10,
    "dataProvider": {
      "mapURL": "peruLow.svg",
      "getAreasFromMap": true,
      "zoomLevel": 0.9,
      "areas": [],
    },
    "areasSettings": {
      "autoZoom": false,
      "balloonText": "[[title]]",
      "selectable": true
    },
    "valueLegend": {
      "right": 10,
      "minValue": "little",
      "maxValue": "a lot!"
    },
    "zoomControl": {
      "minZoomLevel": 0.9
    },
    "titles": titles,
    "listeners": [ {
      "event": "init",
      "method": updateHeatmap
    } ]
  } );


  function updateHeatmap( event ) {
    var map = event.chart;
    console.log(map.dataProvider.areas);
    if ( map.dataGenerated )
      return;
    if ( map.dataProvider.areas.length === 0 ) {
      setTimeout( updateHeatmap, 100 );
      return;
    }
    /*
    map.dataProvider.images.push({

        "latitude":-12.0431800,
        "longitude": -77.0282400,
        "imageUrl":"https://www.amcharts.com/images/weather/weather-storm.png",
        "width":32,
        "height":32,
        "label":"Lima +22C"
      
      });
*/
    for ( var i = 0; i < map.dataProvider.areas.length; i++ ) {
      map.dataProvider.areas[ i ].value = Math.round( Math.random() * 10000 );
  
    }
    map.dataGenerated = true;
    map.validateNow();
  }
map.addListener("clickMapObject", function(event) {
  
  $scope.setLocation(event.mapObject.title);
    $scope.forecast.$promise.then(function(data){

       console.log(data.list[2].temp);
        for(var x=0;x<data.list.length;x++){
          var radia=10+Math.floor((getRandomArbitrary(-2,4)));
          data.list[x].radiacion=radia;
        }
       
        console.log(data.list[0]);
          document.getElementById("info").innerHTML = 'Clicked ID: ' + event.mapObject.id + ' (' + event.mapObject.title + ')'+"<br>Radiacion="+data.list[0].radiacion+"<br>Humedad="+data.list[0].humidity+"<br>Presion="+data.list[0].pressure+"<br>Temperatura="+data.list[0].temp.eve;

       });
});

  $scope.setLocation = function(loc) {
      $scope.location = loc;
      $scope.getForecastByLocation();
  
    };






       ////////////




    $scope.getForecastByLocation = function(p) {
     
      if ($scope.location == '' || $scope.location == undefined) {
        $scope.hasState = 'has-warning';
        $scope.message = 'Please provide a location';
       
      }

      $scope.hasState = 'has-success';
      console.log("LOCACION==",$scope.location);
      $scope.forecast = openWeatherMap.queryForecastDaily({
        location: $scope.location
      });


      $scope.forecast.$promise.then(function(data){
 
          for(var i=0;i<data.list.length;i++){
              (function(i) {
              var fecha=Date(data.list[i].dt);
              var fecha2=new Date(fecha);
            if(fecha2.getDate()+(i-1)<10){
             var dias="0"+(fecha2.getDate()+(i-1));
            }
            else{
              dias=fecha2.getDate()+(i-1);
            }
                
              var fechax=fecha2.getFullYear()+"-"+fecha2.getMonth()+"-"+dias+"Z";
              var lon=parseInt(data.city.coord.lon);
              var lat=parseInt(data.city.coord.lat);
              var url="http://api.openweathermap.org/v3/uvi/"+lat+","+lon+"/"+fechax+".json?appid=943d3a75c72ea297aa73f129275d2140";

            $http.get(url)
            .success(function (dat) {
            data.list[i].radiacion=dat.data;
               console.log("Sucesss=",$scope.forecast.list[i].radiacion)
            });


         
              })(i);
      


        }
         
       });
    }


    function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

    $scope.setLocation = function(loc) {
      $scope.location = loc;
      $scope.getForecastByLocation();
  
    };

    $scope.getIconImageUrl = function(iconName) {
      return (iconName ? $scope.iconBaseUrl + iconName + '.png' : '');
    };

  }])
