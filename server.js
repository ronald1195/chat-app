// multiple variable declaration...
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    usernames = [],
    path = require('path');

    //to include external files into our code...
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static('public'));

    //verify if the server is running.
    server.listen(process.env.PORT || 300);
    console.log('Server running...');

    /*app.use(express.static(path.join(__dirname, 'public')))*/
    app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
    });

    //connecting to socket.
    io.sockets.on('connection', function(socket){
        console.log('Socket connected...');

        socket.on('send message', function(data){
            io.sockets.emit('new message', {msg:data, user:socket.username});
    });

        //creating a new user
        socket.on('new user', function(data, callback){
            console.log('getting new user');

            if(usernames.indexOf(data) != -1){
                callback(false);
            }else{
                callback(true);
                socket.username = data;
                usernames.push(socket.username);
                updateUsernames();
            }

        });

        //update usernames functions
        function updateUsernames(){
            io.sockets.emit('usernames', usernames);
        }


        //disconnect
        socket.on('disconnect', function(data){
        if(!socket.username){
            return;
        }

        usernames.splices(usernames.indexOf(socket.username), 1);
    });

    });

