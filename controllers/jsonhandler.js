var fs = require('fs'),
    path = require('path'),
    __parentDir = path.dirname(module.parent.filename),
    render = require('../routes/index.js'),
    dataModel = require('./datamodel.js').DataModel,
    chartData = require('./chart.js');


var JSONHandler = {
    writeJSON: function (rawString, callback) {
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

                var json = JSON.parse(data);

                if(!data || !JSON.parse(data).items){
                    data = {"items":[]};
                    console.log('no data')
                }else{
                    data = json;
                }


                dataModel.createModel(data);


                render.renderHome(req, res, chartData.render(data)); //TODO: callback this instead of a permanent action


            }
        });
    }
}


exports.JSONHandler = JSONHandler;
