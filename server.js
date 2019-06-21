const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 4000;
const { pollEvents} = require('./events/poll-events');
const { roomEvents} = require('./events/room-events');

initialize();

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

function initialize(){
    listenConnections();
    connectToSocket();
}

function listenConnections(){
    server.listen(port, function(){
        console.log(`Server listening in port ${port}`);
    });
}

function connectToSocket(){
    io.on('connection', function(socket){
        console.log('a user connected');
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });

        pollEvents(socket).startPoll();
        pollEvents(socket).submitVote();
        roomEvents(socket).createRoom();
        roomEvents(socket).joinRoom();
    });
}

