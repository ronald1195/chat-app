// multiple variable declaration...
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
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
            io.sockets.emit('new message', {msg:data});
        });

    });

