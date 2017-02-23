var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public/dist'));

var connectedUsers = [{ name: 'Alex', avatar: '', status: '' }];
var channels = [{ id: '#general', priv: true, users: [], avatar: '', messages: [] },
{ id: '#offtopic', priv: true, users: [], avatar: '', messages: [] }
];


//socket.join() to enter rooms
io.on('connection', function (socket) {
    socket.user = { name: '', avatar: '', status: '' };

    socket.emit('load', channels, connectedUsers);

    socket.on('loggedin', function (user) {
        socket.user = user;
        if ( !connectedUsers.find( function(connuser) { return socket.user.name === connuser.name;}) ) {
            connectedUsers.push(user);
            io.sockets.emit('update', channels, connectedUsers);
            console.log('ssslogin', connectedUsers);
        }
    });
    socket.on('loggedoff', function () {
        connectedUsers.forEach(function (user, i) {
            if (user.name === socket.user.name) {
                connectedUsers.splice(i, 1);
            }
        });
        io.sockets.emit('update', channels, connectedUsers);
    });

    socket.on('enterchannel', function(channel) {
        connected.push(socket.user);
        console.log(socket.user.name + ' connected');
        console.log(connected.map(user => user.name));  // List connected names
        socket.emit('connected', connected);
    });


    socket.on('disconnect', function () {
        /*socket.rooms.forEach( function(room) {
            console.log(`${socket.user.name} disconnected`);
            io.in(room).emit('user:disconnect', {id: socket.id});
        })*/
        
      io.sockets.emit('update', channels, connectedUsers);
    });

});

const PORT = process.env.PORT || '3333';

server.listen(PORT, function () {
    const port = process.env.PORT || '3333';
    console.log(`Listening on port ${PORT}`);
});
