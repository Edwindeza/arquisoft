'use strict';

/* Controllers */

angular.module('openWeatherApp.controllers', [])

  // Controller for "open weather map" api data search
  .controller('OpenWeatherCtrl',
    ['$scope','$http','$rootScope','exampleLocations','openWeatherMap','stormLocations','ISO3166','Ciudades','rayosUV',
      function($scope,$http,$rootScope,exampleLocations,openWeatherMap,stormLocations,ISO3166,Ciudades,rayosUV) {
    $rootScope.consejosA=[];
    $rootScope.userFinal={};
    $scope.message = '';
    $scope.hasState = '';
    $scope.userapp={};

   $scope.userapp=JSON.parse(localStorage.getItem("user"));
   console.log(localStorage);
   console.log(localStorage.getItem("user"))
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


 $rootScope.forecast = openWeatherMap.queryForecastDaily({
      location: exampleLocations[ 0 ]
    });

    initUser();

       //////////////////////


$scope.logout=function(){
console.log("Limpiar");
localStorage.clear();
}


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
      "mapURL": "/img/peruLow.svg",
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
     $rootScope.forecast = openWeatherMap.queryForecastDaily({
        location: event.mapObject.title
      });

   $rootScope.forecast.$promise.then(function(data){
        console.log("DATA DENMTRO FORECAST");
        console.log(data);
 
          (function(){
              var fecha=Date(data.list[0].dt);
              var fecha2=new Date(fecha);
            if(fecha2.getDate()+(0-1)<10){
             var dias="0"+(fecha2.getDate()+(0-1));
            }
            else{
              dias=fecha2.getDate()+(0-1);
            }
                
              var fechax=fecha2.getFullYear()+"-"+fecha2.getMonth()+"-"+dias+"Z";
              var lon=parseInt(data.city.coord.lon);
              var lat=parseInt(data.city.coord.lat);
              var url="http://api.openweathermap.org/v3/uvi/"+lat+","+lon+"/"+fechax+".json?appid=943d3a75c72ea297aa73f129275d2140";


            $http.get(url)
            .success(function (dat) {
            document.getElementById("info").innerHTML = 'Clicked ID: ' + event.mapObject.id + ' (' + event.mapObject.title + ')'+"<br>Radiacion="+dat.data+"<br>Humedad="+data.list[0].humidity+"<br>Presion="+data.list[0].pressure+"<br>Temperatura="+data.list[0].temp.eve;

            data.list[0].radiacion=dat.data;
            });

          
          })();
        console.log(data.list[0]);


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



   $rootScope.forecast = openWeatherMap.queryForecastDaily({
        location: $scope.location
      });

      $scope.datos={};

   $rootScope.forecast.$promise.then(function(data){

 
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

              console.log("Linea 233 data antes",data);
              (function(data){
            $http.get(url)
            .success(function (dat) {

                console.log("Linea 238 data luego",data);

                (function(data){
                  console.log("Linea 241 data luego xdD",data)
                if($rootScope.userFinal){
                  var prueba1=dat.data;
                  var razaPrueba=$rootScope.userFinal.ethnicity;
                  var urlConsejos="http://192.241.148.57:4000/api/advice";
                  console.log(prueba1,razaPrueba);
                  $http.get(urlConsejos)
                  .success(function(data1){
                    var consejos={};
                    var results=[];
                    consejos=data1;
                    consejos.filter
                  for(var j=0; j<consejos.length; j++) {

                    if(consejos[j].ethnicity_type==razaPrueba && consejos[j].min_uv>=prueba1 && consejos[j].max_uv<=prueba1){
                      
                    data.list[i].radiacion=dat.data;
                    data.list[i].consejo=consejos[j]

                    }
                }                    


                console.log("Results==",data);


                  })
                  .error(function(err){
                    console.log("Error==",err);
                  })
                }


            })(data);

               console.log("Sucesss=",$scope.forecast.list[i].radiacion);


            });

          })(data);








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


     function initUser(){
        console.log("Esta en initUser");
      if(window.localStorage.getItem("user")){
     var user_id=JSON.parse(window.localStorage.getItem("user")).userId;
     var authorization=JSON.parse(window.localStorage.getItem("user")).id;

      var urlUser="http://192.241.148.57:4000/api/users/"+user_id;
      $http({
        method:"GET",
        url:urlUser,
        headers:{
          'Authorization':authorization
        }
      })
      .success(function(data,status,headers,config){
        $rootScope.userFinal=data;
        console.log("Data del Perfil de Usuario",data);
      })
      .error(function(err,status,headers,config){
        console.log("Error=",err);
        console.log("Config==",config)
      })
}
    }


    function consultarConsejos(dataConfig){
      if($rootScope.userFinal){
        var urlConsejos="http://192.241.148.57:4000/api/advice";
        $http.get(urlConsejos)
        .success(function(data){
          console.log("Consejos==",consejos)
       
        })
        .error(function(data){
          console.log("Error==",error);
        })
      }
    }

 


  }])



