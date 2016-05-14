/* global chrome */

document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/api/v1/boards/get_id.json').then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data);
  });

  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      var name = document.getElementById("name").value;
      var text = document.getElementById("text").value;
      var boardId = document.getElementById("dropdown").value;

      var f = document.createElement('form');
      f.action = 'http://localhost:3000/api/v1/pins/';
      f.method = 'post';
      var i = document.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url;
      var n = document.createElement('input');
      n.type = 'text';
      n.name = 'name';
      n.value = tab.name;
      var t = document.createElement('input');
      t.type = 'text';
      t.name = 'text';
      t.value = tab.text;
      var d = document.createElement('input');
      d.type = 'text';
      d.name = 'board_id';
      d.value = tab.boardId;

      console.log(f);

      f.appendChild(i);
      f.appendChild(n);
      f.appendChild(t);
      f.appendChild(d);
      document.body.appendChild(f);
      f.submit();
    });
  }, false);
}, false);