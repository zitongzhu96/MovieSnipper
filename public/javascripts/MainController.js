var app = angular.module('MyApp', []);

app.controller('mainController', function($scope, $http) {
	var href_list=window.location.href.split("/");
	var username=href_list[4];
	var topMovies = document.getElementById("top-movies");
    var history = document.getElementById("search-history");
   	topMovies.href=topMovies.href+ "/" + username;
	console.log(username);
	$http({
      url: '/popularList',
      method: "POST",
  }).then(
      res => {
        $scope.popular=res.data;
      },err => {
          console.log("Mainpage content loading error: ", err);
  });

  	$http({
      url: '/ratingList',
      method: "POST",
  }).then(
      res => {
        $scope.highrating=res.data;
      },err => {
          console.log("Mainpage content loading error: ", err);
  }); 

  	$http({
      url: '/recentList',
      method: "POST",
  }).then(
      res => {
        $scope.recent=res.data;
      },err => {
          console.log("Mainpage content loading error: ", err);
  }); 

  	$http({
      url: '/imdbHighList',
      method: "POST",
  }).then(
      res => {
        $scope.imdbhigh=res.data;
      },err => {
          console.log("Mainpage content loading error: ", err);
  }); 

  	$http({
      url: '/rtHighList',
      method: "POST",
  }).then(
      res => {
        $scope.rthigh=res.data;
      },err => {
          console.log("Mainpage content loading error: ", err);
  }); 

   $scope.goInfo = function(title) {

    	$http({
    		url: '/goInfo/'+title,
    		method: 'POST',
    		data:{
    			'title':title,
    			'username':username
    		}
    	}).then(res => {
    		if (res.data.status=='success'){
    			window.location.href = "http://localhost:8001/InfoPage/"+username+"/::"+res.data.id;
    		}else{
    			alert("Sorry there is no detail of this movie :( ");
    		}

    	}, err => {
    		console.log("movieName ERROR: ", err);
  		});
  	}
});
