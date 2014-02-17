var localIo,
    state = require('./state.js');

function init(io){
    localIo = io;
    io.sockets.on('connection', function (socket) {


        socket.emit('news', { hello: 'world' });

        socket.on('choiceClicked', function (data) {
           //TODO: move this out of here - events instead
            state.setChoice(data.choice);

        });


    });
}


function send(eventName, data) {
    localIo.sockets.on('connection', function(socket){
        socket.emit(eventName, data);
    })
}



exports.init = init;
exports.send = send;