function isConnected(user) {
    return connectedUsers.find(function (connuser) {
        return user.name === connuser.name;
    });
}

function disconnect(user) {
    connectedUsers.forEach(function (usr, i) {
        if (usr.name === user.name) {
            connectedUsers.splice(i, 1);
            console.log(usr.name, 'logged out');
        }
    });
}


var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    ss = require('socket.io-stream'),
    path = require('path');
    dl = require("delivery"),
    fs = require("fs");

app.use(express.static('public/dist'));

var connectedUsers = [],
    channels = [{ id: 'general', priv: false, description: 'General chat', avatar: '' },
    { id: 'homework', priv: false, description: 'Here you can talk about your homework', avatar: '' },
    { id: 'offtopic', priv: false, description: 'Talk about anything here', avatar: '' }
    ];


io.on('connection', function (socket) {

    let delivery = dl.listen(socket);
    let socketStream = ss(socket);

    socket.user = { name: '', avatar: '', status: '' };
    socket.emit('load', channels, connectedUsers);


    socket.on('login', function (user) {
        user.id = socket.id;
        socket.user = user;

        connectedUsers.push(user);
        socket.emit('logged-in', user);
        console.log(user.name, 'logged in');
        //console.log('connected users', connectedUsers.map(function (a) { return a.name; }));

        io.sockets.emit('load', channels, connectedUsers);
    });

    socket.on('sendMessage', function (message) {
        // console.log(message.channel.priv);
        if (message.channel.priv) { //he añadido '.channel'
            io.sockets.in(message.channel.id).emit('message', message);
            socket.emit('message', message);
        } else {
            io.sockets.emit('message', message);
        }

    });

    socket.on('logout', function () {
        disconnect(socket.user);
        //console.log('connected users', connectedUsers.map(function (a) { return a.name; }));
        io.sockets.emit('load', channels, connectedUsers);
        console.log(socket.user.name, 'logged out');
    });
    socket.on('disconnect', function () {
        disconnect(socket.user);
        //console.log('connected users', connectedUsers.map(function (a) { return a.name; }));
        io.sockets.emit('load', channels, connectedUsers);
        console.log(socket.user.name, 'logged out');
    });

    socket.on('sendTyping', function (user, channel) {
        if (channel) {
            if (channel.priv) {
                io.sockets.in(channel.id).emit('typing', user, channel);
            } else {
                socket.broadcast.emit('typing', user, channel);
            }
        }
    });
    socket.on('sendStopTyping', function (user, channel) {
        if (channel) {
            if (channel.priv) {
                io.sockets.in(channel.id).emit('stop-typing', user, channel);
            } else {
                socket.broadcast.emit('stop-typing', user, channel);
            }
        }
    });

    socket.on('video', function (image) {
        socket.broadcast.emit('stop-typing', user, channel);
    });


    delivery.on('receive.success', function (file) {
        var params = file.params;
        console.log(params);
        fs.writeFile(file.name, file.buffer, function (err) {
            if (err) {
                console.log('File could not be saved.');
            } else {
                console.log('File saved.');
            }
        });
    });

    delivery.on('delivery.connect', function (delivery) {

        /*delivery.send({
            name: 'sample-image.jpg',
            path: './sample-image.jpg',
            params: { foo: 'bar' }
        });*/

        delivery.on('send.success', function (file) {
            console.log('File successfully sent to client!');
        });

    });

    socketStream.on('profile-image', function(stream, data) {
        let filename = path.basename(data.name);
        stream.pipe(fs.createWriteStream(filename));
    });

});

const PORT = process.env.PORT || '3333';

server.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});
