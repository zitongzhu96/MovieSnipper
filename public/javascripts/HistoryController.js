var app = angular.module('MyApp', []);

app.controller('historyController', function($scope, $http) {
  $http({
      url: '/viewHistory',
      method: "GET",
  }).then(
      res => {
        $scope.history=res.data;
      },err => {
          console.log("Mainpage content loading error: ", err);
  });
});
