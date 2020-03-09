var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var members = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
    console.log('User connected');
    socket.on('disconnect', function(){
      console.log('User disconnected');
    });
  });


io.on('connection', function(socket){
    socket.on('new user', function(callback){
        let username = "User"+Math.floor((Math.random() * 100) + 1);
        socket.nickname = username;
        members.push(socket.nickname);
        callback(username);
        io.sockets.emit('usernames', members);
    });


    socket.on('chat message', function(user, msg){
        var localDate = new Date();
        var localTimeString = localDate.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
        
        io.emit('chat message', '['+localTimeString+'] '+user+': '+msg);
    });
});