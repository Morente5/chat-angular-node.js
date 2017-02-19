var socket = io();

$('form').submit( function(event) {
	event.preventDefault();
  var msg = $('#msg').val();
	socket.emit('message', msg);	
	$('#msg').val('');
} );

socket.on('message', function(msg) {
  console.log('msg');
  $('#messages').append($(`<p>${msg}</p>`));
});