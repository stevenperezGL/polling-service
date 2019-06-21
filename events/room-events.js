const uuidv1 = require('uuid/v1');

const roomEvents = function(socket, io){

    function createRoom(){
        socket.on('create-room', function(){
            const secretKey = uuidv1();
            socket.join(secretKey);
            socket.emit('create-room', secretKey)
        });
    }

    /**
     * The join information contains the secret key.
     */
    function joinRoom(){
        socket.on('join-room', function(joinInformation){
            const info = JSON.parse(joinInformation);
            const {secretKey}= info;

            socket.join(secretKey);
            try{
                const count = io.sockets.adapter.rooms[secretKey].length;
                socket.broadcast.emit(`join-room-${secretKey}`, JSON.stringify({ roomId: secretKey, connectedUsers: count}));
                socket.emit(`join-room-${secretKey}`, JSON.stringify({ roomId: secretKey, connectedUsers: count}));
            }
            catch (e) {
                socket.broadcast.emit(`join-room-${secretKey}`, JSON.stringify(e));
            }
        });
    }

    function quitRoom(){
        socket.on('quit-room', function(secretKey){
            const count = io.sockets.adapter.rooms[secretKey].length;
            socket.leave(secretKey);
            socket.broadcast.emit(`quit-room-${secretKey}`, {secretKey: secretKey, connectedUsers: count});
        })
    }

    return {
        createRoom,
        joinRoom,
        quitRoom
    }
};

module.exports.roomEvents = roomEvents;
