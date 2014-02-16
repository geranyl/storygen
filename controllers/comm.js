var localIo,

    tries = 0;

function init(io){
    localIo = io;
    io.sockets.on('connection', function (socket) {


        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });


    });
}


function send(eventName, data) {


    localIo.sockets.on('connection', function(socket){
        socket.emit('news', data);
    })


}



exports.init = init;
exports.send = send;