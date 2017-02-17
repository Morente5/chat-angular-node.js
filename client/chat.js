var socket = io();

$('form').submit( function(event) {
	event.preventDefault();
  var msg = $('#msg').val();
	socket.emit('my event', msg);	
	$('#msg').val('');
} );

socket.on('my event', function(msg) {
  console.log('msg');
  $('#messages').append($(`<p>${msg}</p>`));
});