var path = require('path');

var async = require('async');
var express = require('express');
var router = express();
var socketio;
var messages;
var sockets ;
var username;


module.exports = (io,server) =>{
socketio = require('socket.io')(server);
//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
 messages = [];
 sockets = [];
 username = "";

io.on('connection', function (socket) {
    messages.forEach(function (data) {
      socket.emit('message', data);
    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
      updateRoster();
    });

    socket.on('message', function (msg) {
      var text = String(msg || '');

      if (!text)
        return;

//      socket.get('name', function (err, name) {
        var data = {
          name: username,
          text: text
        };
//
        broadcast('message', data);
        messages.push(data);
//      });
    });

    socket.on('identify', function (name) {
//      socket.set('name', String(name || 'Anonymous'), function (err) {
//        updateRoster();
//      });
        username = name;
        console.log("identify: " + name);
    });
  });
    
}

function updateRoster() {
  async.map(
    sockets,
    function (socket, callback) {
      //socket.get('name', callback);
    },
    function (err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}
