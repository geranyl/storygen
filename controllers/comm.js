var io,
    socket,
    self = this;

function init(io, cb){
    self.io = io;
    io.sockets.on('connection', function (socket) {

        self.socket = socket;
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });

        cb();
    });
}


function send(eventName, data) {
    if(socket){
        socket.emit('news')
    }
}



exports.init = init;