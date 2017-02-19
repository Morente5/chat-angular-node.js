var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));


io.on('connection', function(socket) {
	console.log('Somebody connected');
	socket.on('message', function(msg) {
		console.log(msg);
		io.sockets.emit('message', msg);
	});

	socket.on('disconnect', function() {
		console.log('Somebody disconnected')
	});
});

const PORT = process.env.PORT || '3333';

server.listen(PORT, function() {
	const port = process.env.PORT || '3333';
	console.log(`Listening on port ${PORT}`);
});