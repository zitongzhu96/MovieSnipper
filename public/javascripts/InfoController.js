var app = angular.module('MyApp', []);

app.controller('infoController', function($scope, $http) { 
	var href_list=window.location.href.split("::");
	var rtid=href_list[href_list.length-1];
	var href_list2=window.location.href.split("/");
	var username=href_list2[4];
	var topMovies = document.getElementById("top-movies");
    var history = document.getElementById("search-history");
   	topMovies.href=topMovies.href+ "/" + username;
    $scope.addPoster = function(){
        $http({
            url: '/addPoster',
            method: "POST",
            data: {
                'rtid': rtid,
            }
        }).then(
        res => {
            if (res.data.status=='success'){
                let year=document.getElementById("release");
                release.innerHTML="("+res.data.release+")";
                let poster=document.getElementById("movie-poster");
                poster.src=res.data.url;
                let title=document.getElementById("info-title");
                title.innerHTML=res.data.title;
				        let director=document.getElementById("info-director");
                director.innerHTML=res.data.director;
                let runtime=document.getElementById("info-runtime");
                runtime.innerHTML=res.data.runtime;
                let actors=document.getElementById("info-actors");
                actors.innerHTML=res.data.actors;
                let genre=document.getElementById("info-genre");
                genre.innerHTML=res.data.genre;
                let rating=document.getElementById("info-rating");
                rating.innerHTML=res.data.rating;
                let score=document.getElementById("info-score");
                score.innerHTML=res.data.score;
            }
        },err => {
            console.log("Poster loading error: ", err);
        }); 
    };

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

   $http({
      url: '/suggestList',
      method: "POST",
      data:{
        'rtid':rtid,
      },
  }).then(
      res => {
        $scope.suggest=res.data;
      },err => {
          console.log("Mainpage content loading error: ", err);
  });

  $http({
      url: '/reviewsList',
      method: "POST",
      data:{
      	'rtid':rtid,
      	'username':username
      }
  }).then(
      res => {
        $scope.reviews=res.data;
      },err => {
          console.log("Mainpage content loading error: ", err);
  });

  $http({
      url: '/getIntro',
      method: "GET",
      params:{
        'rtid':rtid,
      }
  }).then(
      res => {
        document.getElementById("intor").innerHTML=res.data.info;
      },err => {
          console.log("Mainpage content loading error: ", err);
  });
});