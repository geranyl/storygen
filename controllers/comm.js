var state = require('./state.js'),
    dataModel = require('./datamodel.js'),
    chartFormatter = require('./chart.js'),
    localIo;


function init(io){
    localIo = io;
    io.sockets.on('connection', function (socket) {
        socket.on('choiceClicked', function (data) {
           //TODO: move this out of here - events instead
            state.setChoice(data.choice);
        });
        socket.on('fetchGraph', function(data){

            if(dataModel.DataModel.currentData.items)
                socket.emit('graph', chartFormatter.convert(dataModel.DataModel.currentData));
        });

    });
}


function sendData(eventName, data){
    localIo.sockets.emit(eventName, data);
}


exports.init = init;
exports.sendData = sendData;
