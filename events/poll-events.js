const pollEvents = function(socket){

    function startPoll(){
        /**
         * The poll information contains: Voting method(Fibonacci), options, secret key.
         */
        socket.on('poll-actions', function(pollInformation){
            socket.broadcast.emit('poll-actions', pollInformation);
        });
    }

    function submitVote() {
        /**
         * The vote Information contains: the selected option, the secret key and the user id.
         */
        socket.on('submit-vote', function (voteInformation) {
            socket.broadcast.emit('submit-vote', voteInformation);
        })
    }

    return {
        startPoll,
        submitVote
    }
};

module.exports.pollEvents = pollEvents;
