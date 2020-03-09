var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var members = [];
var colorMap = new Map();

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
      socket.emit('disconnect nic request');
    });
  });


io.on('connection', function(socket){
    
    socket.on('new user', function(callback){
        let username = "User"+Math.floor((Math.random() * 100) + 1);
        socket.nickname = username;
        members.push(socket.nickname);
        console.log(members);
        callback(username);
    });

    socket.on('provide nickname', function(data){
        let index = members.indexOf(data);
        if(index <= -1){
            members.push(data);
        }
        console.log(members);
        io.emit('usernames', members);
    });   

    socket.on('provide nickname disconnect', function(data){
        let index = members.indexOf(data);
        console.log(index);
        console.log(data);
        if(index > -1){
            members.splice(index,1);
        }
        console.log(members);
        io.sockets.emit('usernames', members);
    });

    socket.on('change nickname', function(nickname, newNickname, callback){
        if(nickname==newNickname){
            callback(false);
        }
        let index = members.indexOf(nickname);
        if(index > -1){
            members.splice(index,1);
        }
        members.push(newNickname);
        io.emit('usernames', members);
        callback(true);
    });

    socket.on('change nickname color', function(nickname,newNickColour,callback){
        colorMap.set(nickname,newNickColour);
        callback(true);
        console.log(newNickColour);
    });

    socket.on('chat message', function(user, msg){
        console.log(colorMap);
        var localDate = new Date();
        var localTimeString = localDate.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
        let color = colorMap.get(user);
        if(color===undefined){
            color = "000000";
        }
        io.emit('chat message', user, color, '['+localTimeString+'] '+user+': '+msg);
    });
});