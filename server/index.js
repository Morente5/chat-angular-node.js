var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'))


server.listen(3333, function() {
	console.log('Welcome')
});

io.on('connection', function(socket) {
	socket.on( 'my event', function(data) {
		io.sockets.emit('my event', data);
		console.log(data)
	} );
});