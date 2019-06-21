const pollEvents = function(socket){

    function startPoll(){
        /**
         * The poll information contains: Voting method(Fibonacci), options, secret key.
         */
        socket.on('poll-actions', function(pollInformation){
            const {secretKey} = JSON.parse(pollInformation);
            socket.broadcast.emit(`poll-actions-${secretKey}`, pollInformation);
        });
    }

    function submitVote() {
        /**
         * The vote Information contains: the selected option, the secret key.
         */
        socket.on('submit-vote', function (voteInformation) {
            const {secretKey} = JSON.parse(voteInformation);
            socket.broadcast.emit(`submit-vote-${secretKey}`, voteInformation);
            socket.emit(`submit-vote-${secretKey}`, voteInformation);
        });
    }

    return {
        startPoll,
        submitVote
    }
};

module.exports.pollEvents = pollEvents;
