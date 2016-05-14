/* global angular, chrome */

(function() {
  angular.module("app").controller("boardsController", function($scope, $http) {
    $scope.setup = function() {
      $http.get("http://localhost:3000/api/v1/boards/get_id").then(function(response) {
        $scope.boards = response.data;
      });
    };

    $scope.addPin = function(board_id, name, text) {
      chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        var params = {
          url: tabs[0].url,
          board_id: board_id,
          name: name,
          text: text
        };
        $http.post("http://localhost:3000/api/v1/pins.json", params).then(function(response) {
          console.log(response);
          // $scope.boards.push(newBoard);
        });
      });
    };
  });
})();