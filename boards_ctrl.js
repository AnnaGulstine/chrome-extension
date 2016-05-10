/* global angular */

(function() {
  angular.module("app").controller("boardsController", function($scope, $http) {
    $scope.setup = function() {
      $http.get("http://localhost:3000/api/v1/boards/get_id").then(function(response) {
        $scope.boards = response.data;
      });
    };

    // $scope.addPin = function(text) {
    //   var newPin = {
    //     text: text
    //   };
    //   $http.post("http://localhost:3000/api/v1/pins", newPin).then(function(response) {
    //     console.log(response);
    //     $scope.boards.push(newPin);
    //   });
    // };

    $scope.addBoard = function(address) {
      var newBoard = {
        address: address
      };
      $http.post("http://localhost:3000/api/v1/boards/get_id", newBoard).then(function(response) {
        console.log(response);
        $scope.boards.push(newBoard);
      });
    };
  });
})();