
//pass in data as normal json
var converter = require('./convert.js'),
    comm = require('./comm.js');

function render(data){
    var newJson = converter.convert(data);
    console.log('render')
    console.dir(newJson)

    comm.send('news',newJson);

}

exports.render = render;