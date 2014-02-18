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
            console.log('fetching');
            console.dir(dataModel.DataModel.currentData)

            if(dataModel.DataModel.currentData.items)
                var newJson = chartFormatter.convert(dataModel.DataModel.currentData);
                socket.emit('graph', newJson);
        });

    });
}


function sendData(eventName, data){
    localIo.sockets.emit(eventName, data);
}


exports.init = init;
exports.sendData = sendData;
