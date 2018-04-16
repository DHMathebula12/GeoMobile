// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var example = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
var mylocations;

example.controller("MapController", function($scope, $ionicLoading, $http, $ionicModal){
  

   
 $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });
  

google.maps.event.addDomListener(window,"load",function(){

 //var myLatLng = new google.maps.LatLng(37.3000,-120.4833);

 var mapOptions = {
  enableHighAccuracy: true,
  zoom:16,
  mapTypeId: google.maps.MapTypeId.ROADMAP
 };

$http.get("http://gogolocator.x10host.com/Mobile/www/php/GetInfoQuery.php")
.success(function (response) {$scope.names = response.records;

mylocations = response;

var locations = {};

   locations = mylocations.substring(10);

   mlocations = locations.split(",");

 var map = new google.maps.Map(document.getElementById("map"),mapOptions);

  
navigator.geolocation.getCurrentPosition(function(pos){
map.setCenter(new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude));

$scope.data = {};
var lat  = pos.coords.latitude;
var long = pos.coords.longitude;
var newLatLng = new google.maps.LatLng(lat,long);
//var username = $scope.data.username;
//var password = $scope.data.password;

 $scope.findMe = function()
  {
    
    window.location.href = "http://gogolocator.x10host.com/Mobile/www/php/InsertDataQuery.php?latitude=" + lat + "&longitude=" + long + "&username=" + $scope.data.username + "&password=" + $scope.data.password; 
  };

var infoWindow = new google.maps.InfoWindow({map: map});
    infoWindow.setPosition(newLatLng);
    infoWindow.setContent('You Are Here.');

var marker,i,j;
 
             for (i = 1; i <= mlocations.length; i++) { 
             
             marker = new google.maps.Marker({
             position: new google.maps.LatLng(mlocations[i], mlocations[i + 1]),map: map

               });}


});

 $scope.map = map;
 $ionicLoading.hide(); 
//
   
//

});



});
});

