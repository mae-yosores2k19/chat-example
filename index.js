

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8000;


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {
  socket.on('chat message', function (data) {
    io.emit('chat message', data);
  });
  socket.on('online', function (data) {
    if (!online.includes(data.username)) {
      online.push(data);
    }
    io.emit('online', online);
  });
  socket.on('typing', function (data){
    io.emit('typing',data);
  })
});






http.listen(port, function () {
  console.log('listening on *:' + port);
});


