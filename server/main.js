var arguments = process.argv;
var cmdLineArg = process.argv[2];
 
if (typeof cmdLineArg === 'undefined')
    console.log("no cmdline argument passed!");
else
    console.log("cmdline argument passed :: " + cmdLineArg);

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

var messageInit = {
    id: '',
    text: "Hola soy bot",
    author: "Bot"
};

io.on('connection', function(socket) {
    console.log('Cliente connected id: ' + socket.id);
    messageInit.id = socket.id;
    socket.send(messageInit);
    socket.emit('all-messages', messageInit);

    // io.sockets.emit('new-user', socket.id);
    socket.broadcast.emit('new-user', socket.id);

    socket.on('new-message', function(data) {
        io.sockets.emit('all-messages', data);
    });
});

server.listen(8080, function() {
    console.log('Servidor corriendo en http://localhost:8080');
});
