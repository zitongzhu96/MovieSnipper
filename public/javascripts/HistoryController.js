var app = angular.module('MyApp', []);

app.controller('historyController', function($scope, $http) {
  const href = window.location.href.split('/');
  username = href[href.length-1];
  var temp=""
  $http({
      url: '/viewHistory',
      method: "GET",
      params: {
      	username:href[href.length-1],
      }
  }).then(
      res => {
        $scope.history=res.data;
      },err => {
          console.log("Mainpage content loading error: ", err);
  });

  $http({
      url: '/getUser',
      method: "GET",
      params:{
      	username: href[href.length-1],
      }
  }).then(
      res => {
      	console.log(res.data);
        document.getElementById('relate').innerHTML=res.data;
      },err => {
          console.log("Mainpage content loading error: ", err);
  });

  $http({
        url: '/suggestByUser',
        method: "GET",
        params:{
        	username: href[href.length-1],
        }
    }).then(
        res => {
          $scope.suggest=res.data;
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
