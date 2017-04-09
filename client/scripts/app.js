// YOUR CODE HERE:

  // $(document).ready(function() {
  //   const apiURL = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';

  //   let app = function(messages) {
  //     for (let message of messages.results) {
  //       var publishMessage = message.username + ' : ' + message.text;
  //       $('#chats').append($('<span>'+ publishMessage +'</span>'));
  //     } 
  //   }

  //   $.get(apiURL, app;
  // });


// let message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

$(document).ready(function() {
  $('#send').submit(app.handleSubmit);
});

var app = { 
  'apiURL' : undefined,
  'roomnames': undefined,
}

app.init = function() {
  //debugger;
  app.roomnames = new Set();
};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.apiURL,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
}

app.fetch = function(room) {
  // $.get(app.apiURL, app.renderMessage);
  $.ajax({
    url: app.apiURL,
    type: 'GET',
    data: {limit : 1000, order : '-createdAt'},
    success: function (data) {
      console.log('chatterbox: Message received: ', data.results);
      room ? app.renderMessageInRoom(data, room) : app.renderMessage(data);
      room ? undefined : app.createRoomList();
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message', data);
    }
  });
}

app.clearMessages = function() {
  $('#main #buttons').empty();
  $('#chats').empty();
}

app.renderMessage = function(messages) {
  app.clearMessages();
  // var $buttons = $('<div id=\'buttons\'></div>');
  //debugger;
  for (var message of messages.results) {
    //debugger;
    var $button = $('<button class=\'username\'>'+ message.username + '</button>');
    $button.on('click', app.handleUsernameClick);
    $('#main #buttons').append($button);
    // $('#main').append($buttons);
    app.roomnames.add(message.roomname);
      
    var $username = $('<p class=\'username\'>' + message.username + ' (' + message.roomname + ') :</p>');
    var $message = $('<span id=\'message\'>' + message.text + '<br></span>');
    var $div = $('<div id=\'message\' class=\'chat\'></div><br>');
    $div.append($username);
    $div.append($message);
    $('#chats').append($div);
  }
}

app.renderMessageInRoom = function(messages, targetRoomname) {
  app.clearMessages();
    // var $buttons = $('<div id=\'buttons\'></div>');
    //debugger;
    for (var message of messages.results) {
      //debugger;
      if (message.roomname === targetRoomname) {
      var $button = $('<button class=\'username\'>'+ message.username + '</button>');
      $button.on('click', app.handleUsernameClick);
      $('#main #buttons').append($button);
      var $username = $('<p class=\'username\'>' + message.username + ' (' + message.roomname + ') :</p>');
      var $message = $('<span id=\'message\'>' + message.text + '<br></span>');
      var $div = $('<div id=\'message\' class=\'chat\'></div><br>');
      $div.append($username);
      $div.append($message);
      $('#chats').append($div);
      }
    }
}

app.handleUsernameClick = function(){

}

app.createRoomList = function() {
  for(let key of app.roomnames) {
    $('#manyrooms').append($('<option value=' + key + '>'+ key +'</option>'));
  }
  //create event for option, once we chose a option (room), invoke renderRoom(room)
  $('#manyrooms').change(app.renderRoom($('#manyrooms').val()));
}


app.renderRoom = function(room) {
  console.log('call on renderRoom');
  app.fetch(room);
}

app.handleSubmit = function(event) {
  let message = {
    username: window.location.search.slice(10),
    text: $('#inputbox').val(),
    // roomname: '4chan'
  };
  app.send(message);
  event.preventDefault();
}

app.apiURL = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
// setInterval(app.fetch, 1000); 
app.init();
app.fetch();

