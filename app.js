var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
usernames = [];
server.listen(8080);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('new user', function(data, callback){
    if(usernames.indexOf(data) !=-1){
      callback(false);
    } else {
      callback(true);
      socket.username = data;
      usernames.push(socket.username);
      updateUsernames();
    }
  });

  //Update usernames
  function updateUsernames(){
    socket.emit('usernames', usernames);
  }
  // socket.emit('news', { hello: 'world' });
  socket.on('send message', function(data) {
    console.log(data);
    socket.emit('new message', {msg: data, user: socket.username});
  });

  //Disconnect
  socket.on('disconnect', function(data){
    if(!socket.username) return;
    usernames.splice(usernames.indexOf(socket.username), 1);
    updateUsernames();
  });
});
