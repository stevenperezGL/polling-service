const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, { origins: '*:*'});
const port = process.env.PORT || 4000;
const { pollEvents} = require('./events/poll-events');
const { roomEvents} = require('./events/room-events');
const { optionsEvents } = require('./events/options-events');

app.use(cors());

app.all('*', function(req, res, next) {
    var origin = req.get('origin');
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

server.use(cors());

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
        socket.emit('connection', 'Socket Connected');

        socket.on('disconnect', function(){
            console.log('user disconnected');
        });

        pollEvents(socket).startPoll();
        pollEvents(socket).submitVote();
        roomEvents(socket).createRoom();
        roomEvents(socket).joinRoom();
        roomEvents(socket).quitRoom();
        optionsEvents(socket).getOptions();
    });
}

initialize();

