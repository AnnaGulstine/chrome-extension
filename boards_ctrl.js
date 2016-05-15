/* global angular, chrome */

(function() {
  angular.module("app").controller("boardsController", function($scope, $http) {
    $scope.setup = function() {
      $http.get("http://localhost:3000/api/v1/boards").then(function(response) {
        $scope.boards = response.data;
      });
    };

    $scope.addPin = function(category_id, board_id, name, text) {
      chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        var params = {
          url: tabs[0].url,
          board_id: board_id,
          name: name || tabs[0].title,
          text: text,
          category_id: category_id
        };
        $http.post("http://localhost:3000/api/v1/pins.json", params).then(function(response) {
          console.log(response);
        });
      });
    };
  });
})();