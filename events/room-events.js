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
     * The join information contains the user id and the secret key.
     */
    function joinRoom(){
        socket.on('join-room', function(joinInformation){
            const info = JSON.parse(joinInformation);
            const {secretKey, userId}= info;

            socket.join(secretKey);
            try{
                const count = io.sockets.adapter.rooms[secretKey].length;
                socket.broadcast.emit('join-room', JSON.stringify({ roomId: secretKey, userId: userId, connectedUsers: count}));
            }
            catch (e) {
                socket.broadcast.emit('join-room', JSON.stringify(e));
            }
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
