var fs = require('fs'),
    path = require('path'),
    __parentDir = path.dirname(module.parent.filename),
    render = require('../routes/index.js');


var JSONHandler = {
    writeJSON: function (req, res, rawString) {
        var jsonString = JSON.stringify(rawString, 0, 4);

        fs.writeFile('./public/files/file.json', jsonString, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("The file was saved!");




            }
        });
    },
    readJSON: function(req, res){
        fs.readFile('./public/files/file.json', 'utf8', function (err, data){
            if(err){
                console.log(err);
            }else{
                data = JSON.parse(data);
                console.dir(data.items);

                render.renderHome(req, res, data.items);


            }
        });
    }
}


exports.JSONHandler = JSONHandler;
