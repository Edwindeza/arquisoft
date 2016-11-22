var app=angular.module("app",[]);

app.controller("login",function($scope,$http,$window){
$scope.user={};
$scope.userlogin={};

$scope.inicio=function(){



}

$scope.registrar=function(){
	console.log($scope.user);
	$scope.user.gender="masculino";
	$scope.user.birth_date="11/18/2016 12:00 AM";
	var parameter=JSON.stringify($scope.user)
	var url="http://192.241.148.57:4000/api/users?access_token=3150";
	$http.post(url,parameter)
	.success(function(data,status,headers,config){
		console.log("Sucess==",data)
		$window.location.href = '/user/login#signin';

	})
	.error(function(error,status,headers,config){
		console.log("Error==",error);

	});
}

$scope.login=function(){
	var parameter=JSON.stringify($scope.userlogin);
	var url="http://192.241.148.57:4000/api/users/login?access_token=3150";
	$http.post(url,parameter)
	.success(function(data,status,headers,config){
		var tempuser={};
		data.username=$scope.userlogin.username;



		window.localStorage.setItem("user",JSON.stringify(data));
		$window.location.href = '/#/forecast';

		console.log(window.localStorage);

	})
	.error(function(error,status,headers,config){
		console.log("Error==",error);

	});
}

$scope.logout=function(){
console.log("Limpiar");
localStorage.clear();
}

});