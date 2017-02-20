var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public/dist'));

var connected = [];

io.on('connection', function(socket) {
    socket.on('userconn', function(user) {
        console.log(user.name + ' connected');
        connected.push(user);
        console.log(connected);
        io.sockets.emit('connected', connected);
    })
	socket.on('message', function(msg) {
		console.log(msg);
		io.sockets.emit('message', msg);
	});

	socket.on('disconnect', function() {
		console.log('Somebody disconnected');
        io.sockets.emit('connected', connected);
	});

	socket.on('disconn', function(user) {
		console.log(user.name,'disconnected');
        connected = connected.filter( function(userconn) {
            return user.name !== userconn.name;
        } );
        io.sockets.emit('connected', connected);
        socket.emit('disconnect');
	});

});

const PORT = process.env.PORT || '3333';

server.listen(PORT, function() {
	const port = process.env.PORT || '3333';
	console.log(`Listening on port ${PORT}`);
});
