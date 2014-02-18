
//pass in data as normal json
var converter = require('./convert.js');

function convert(data){
    var newJson = converter.convert(data);
    return newJson;
}

exports.convert = convert;