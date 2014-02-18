
//pass in data as normal json
var converter = require('./convert.js');

function convert(data, cb){
    var newJson = converter.convert(data, cb);
    return newJson;
}

exports.convert = convert;