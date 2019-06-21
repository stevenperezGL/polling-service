const { getOptions } = require('../app');

const optionsEvents = function(socket){

    function getOptionsFromMongo(){
        const options = ['1', '2', '3', '5', '8', '13', '21'];
        socket.on('get-options', function (secretKey) {
            socket.emit(`get-options-${secretKey}`, JSON.stringify(options));
            // getOptions().then(response =>
            //     socket.emit(`get-options-${secretKey}`, JSON.stringify(response)))
            //     .catch((reason =>
            //         console.log(`Rejected promise. Reason => ${reason}`)
            //     ));
        });
    }

    return {
        getOptions: getOptionsFromMongo
    }
};

module.exports.optionsEvents = optionsEvents;
