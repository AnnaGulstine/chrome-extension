/* global angular */

(function() {
  angular.module("app").controller("boardsController", function($scope, $http) {
    $scope.setup = function() {
      $http.get("http://localhost:3000/api/v1/boards/get_id.json").then(function(response) {
        $scope.boards = response.data;
      });
    };

    $scope.savePage = function() {
      $http.post("http://localhost:3000/api/v1/pins.json");
      $scope.message = "hello";
    };
  });
})();
