const app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const port = process.env.PORT || 4000;

initialize();

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

function initialize(){
    listenConnections();
}

function listenConnections(){
    server.listen(port, function(){
        console.log(`Server listening in port ${port}`);
    });
}
