var USERJOINED = 'USERJOINED';
var USER_LEFT = 'USER_LEFT';
var SEND_MESSAGE = 'SEND_MESSAGE';
var TYPING = 'TYPING';
var STOP_TYPING = 'STOP_TYPING';
var express = require('express');
var app = express();
var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var server = require('http').Server(app);
var io = require('socket.io')(server);


const isDevelopment = (process.env.NODE_ENV !== 'production');
if(isDevelopment){
  var compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath,stats:{colors:true} }))
  app.use(webpackHotMiddleware(compiler))
}
app.use(express.static(path.join(__dirname, 'public')));

server.listen(80, function(){
  console.log('listening on *:80');
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
