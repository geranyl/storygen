var fs = require ('fs');
var path = require('path'),
    __parentDir = path.dirname(module.parent.filename);
/*
 * GET home page.
 */


exports.index = function(req, res){

    var rawString = {
        "blah": "blah1",
        "yes": ["yes1", "yes2"],
        "no": {
            "maybe": "maybe"
        }
    }

  var jsonString = JSON.stringify(rawString, 0, 4);

  fs.writeFile(__parentDir+'/public/files/file.txt', jsonString, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
            res.render('index', { title: 'Express' });
        }
    });

};