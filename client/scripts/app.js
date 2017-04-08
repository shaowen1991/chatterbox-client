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

var app = { 
  'apiURL' : undefined
}

app.init = function() {
  $("#send .submit").submit(app.handleSubmit);
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
app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.apiURL,
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message recieved');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to recieve message', data);
    }
  });
}


app.clearMessages = function() {
  $('#chats').html('');
}

app.renderMessage = function(message) {
  //if message is a object
  if (typeof message === 'object') {
    var $button = $('<button class=\'username\'>'+ message.username + '</button>');
    $button.on('click', app.handleUsernameClick);
    $('#main').append($button);
    var $span = $('<span id=\'message\'>' + message.text + '</span>');
    $('#chats').append($span);
  }
}

app.handleUsernameClick = function(){

}

app.renderRoom = function(room) {
  $('#roomSelect').append('<span>'+ room +'</span>')
}

app.handleSubmit = function() {

}

// $.get(app.apiURL, app.init);

// app.prototype.init = function(messages) {
//   for (let message of messages.results) {
//         var publishMessage = message.username + ' : ' + message.text;
//         $('#chats').append($('<span>'+ publishMessage +'</span>'));
//       } 
// }