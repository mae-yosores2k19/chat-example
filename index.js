

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8000;
var active = [];
var typing = [];

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
  socket.on('chat message', function (data) {
    io.emit('chat message', data);
  });
  socket.on('online', function (username) {

    active.push({ id: socket.id, username: username })
    setInterval(function () {
      socket.emit('online', active);
    }, 1000)
  })
  socket.on('disconnect', function (user) {
    for (let i = 0; i < active.length; i++) {
      if (active[i].id == socket.id) {
        active.splice(i, 1)//removing the user account
        break;
      }
    }
  })
  socket.on('typing', function (user) {
    socket.broadcast.emit('typing', user);
  }) 
});
http.listen(port, function () {
  console.log('listening on *:' + port);
});


