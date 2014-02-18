var state = require('./state.js'),
    dataModel = require('./datamodel.js').DataModel,
    chartFormatter = require('./chart.js');


var count = 0;
function init(io){
    io.sockets.on('connection', function (socket) {
        socket.on('choiceClicked', function (data) {
           //TODO: move this out of here - events instead
            state.setChoice(data.choice);
        });
        socket.on('fetchGraph', function(data){

            for (var key in dataModel.currentData.items){
                console.dir(dataModel.currentData.items[key])
            }

            socket.emit('graph', {data: count});
            count++;
            socket.emit('graph', chartFormatter.convert(dataModel.currentData));
        });

    });
}



exports.init = init;
