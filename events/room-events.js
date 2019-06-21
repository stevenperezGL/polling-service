const uuidv1 = require('uuid/v1');

const roomEvents = function(socket){

    function createRoom(){
        socket.on('create-room', function(){
            const secretKey = uuidv1();
            socket.join(secretKey);
            socket.emit('create-room', secretKey)
        });
    }

    /**
     * The join information contains the user id and the secret key.
     */
    function joinRoom(){
        socket.on('join-room', function(joinInformation){
            const info = JSON.parse(joinInformation);
            const {secretKey, userId}= info;

            socket.join(secretKey);
            const count = io.sockets.adapter.rooms[secretKey].length;
            socket.broadcast.emit('join-room', { roomId: secretKey, userId: userId, connectedUsers: count});
        });
    }

    function quitRoom(){
        socket.on('quit-room', function(secretKey){
            socket.leave(secretKey);
            socket.emit('quit-room', secretKey);
        })
    }

    return {
        createRoom,
        joinRoom,
        quitRoom
    }
};

module.exports.roomEvents = roomEvents;
