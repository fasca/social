var net = require('net');
 
var sockets = [];
 
/*
 * Callback method executed when data is received from a socket
 */
function receiveData(data)
{
	for(var i = 0; i<sockets.length; i++) {
		sockets[i].write(data);
	}
}
 
/*
 * Callback method executed when a new TCP socket is opened.
 */
function newSocket(socket)
{
	sockets.push(socket);
	socket.write('Welcome to the Telnet server!\n');
	socket.on('data', function(data) {
		receiveData(data);
	})
}
 
// Create a new server and provide a callback for when a connection occurs
var server = net.createServer(newSocket);
 
// Listen on port 1337
server.listen(1337);