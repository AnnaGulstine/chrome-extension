/* global angular, chrome */

(function() {
  angular.module("app").controller("boardsController", function($scope, $http) {
    $scope.setup = function() {
      $http.get("http://localhost:3000/api/v1/boards").then(function(response) {
        $scope.boards = response.data;
      });
    };

    $scope.submitted = false;

    $scope.addPin = function(category, board_id, name, text) {
      chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
      chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
              chrome.tabs.captureVisibleTab(
                  null,
                  {},
                  function(dataUrl)
                  {
                      sendResponse({imgSrc:dataUrl});
                  }
              );
              return true;
          }
      );

        var url = tabs[0].url;
        var urlNoProtocol = url.replace(/^https?\:\/\//i, "");
        var correctURL = 'http://' + urlNoProtocol;

        var params = {
          url: correctURL,
          board_id: board_id,
          name: name,
          text: text,
          category: category
        };
        $http.post("http://localhost:3000/api/v1/pins", params).then(function(response) {
          $scope.submitted = true;
          board_id = response.data.board_id;
          document.getElementById("redirectLink").href = "http://localhost:3000/boards/" + board_id;
        });

      });
    };
  });
})();