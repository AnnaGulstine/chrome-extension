/* global angular, chrome */

(function() {
  angular.module("app").controller("boardsController", function($scope, $http) {
    $scope.setup = function() {
      $http.get("http://localhost:3000/api/v1/boards/get_id").then(function(response) {
        $scope.boards = response.data;
      });

      // chrome.tabs.getSelected(null, function(tab) {
      //   console.log('init get tab', tab);
      // });
      // chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
      //   console.log(tabs[0].url);
      // });
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

    $scope.addPin = function(text, board_id) {
      chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        var params = {
          text: text,
          url: tabs[0].url,
          board_id: board_id
        };
        $http.post("http://localhost:3000/api/v1/pins.json", params).then(function(response) {
          console.log(response);
          // $scope.boards.push(newBoard);
        });
      });
    };
  });
})();