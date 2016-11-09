var USERJOINED = 'USERJOINED';
var USER_LEFT = 'USER_LEFT';
var SEND_MESSAGE = 'SEND_MESSAGE';
var TYPING = 'TYPING';
var STOP_TYPING = 'STOP_TYPING';
var express = require('express');
var app = express();
var path = require('path');

var server = require('http').Server(app);
var io = require('socket.io')(server);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

server.listen((process.env.PORT || 3001), function(){
  console.log('listening on *:3001');
});


var numUsers = 0;

io.on('connection', function(socket){
  var addedUser = false;
  console.log('a user connected');

  socket.on(SEND_MESSAGE,function(data){
    console.log("SEND_MESSAGE");
   	socket.broadcast.emit(SEND_MESSAGE, data);
  });

  socket.on(USERJOINED,function(data){
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = data.username;
    ++numUsers;
    addedUser = true;

    data.numUsers = numUsers;

    console.log("USERJOINDED" + JSON.stringify( data));
 	  socket.broadcast.emit(USERJOINED, data);
  });

  socket.on(TYPING,function( data){
    console.log(data.username + " is TYPING " + ' message \"' + data.message + '\"');
   	socket.broadcast.emit(TYPING, data);
  });

  socket.on( 'disconnect',function(){
    if (addedUser) {
      --numUsers;

      console.log('user ' + socket.username + ' left');
      // echo globally that this client has left
      socket.broadcast.emit(USER_LEFT, {
        type: USER_LEFT,
        username: socket.username,
        message: socket.username + ' go away'
      });
    }
  });
});
