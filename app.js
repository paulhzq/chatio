var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  socket.on('send message', function (data) {
    console.log(data);
    io.sockets.emit('new message', {msg: data});
  });
});
