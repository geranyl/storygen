
//pass in data as normal json
var converter = require('./convert.js');

function convert(data){
    var newJson = converter.convert(data);
    console.log('render')
    console.dir(newJson)


    return newJson;

}

exports.convert = convert;