const { getOptions } = require('../app');

const optionsEvents = function(socket){

    function getOptions(){
        socket.on('get-options', function (secretKey) {
            getOptions().then(response =>
                socket.emit(`get-options-${secretKey}`, JSON.stringify(response)))
                .catch((reason =>
                    console.log(`Rejected promise. Reason => ${reason}`)
                ));
        });
    }

    return {
        getOptions
    }
};

module.exports.optionsEvents = optionsEvents;
