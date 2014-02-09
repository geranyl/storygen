var jsonWriter = require ('../controllers/JSONHandler').JSONHandler;
/*
 * GET home page.
 */


exports.index = function(req, res){

    var rawString = {
        "heah": "blah1",
        "yes": ["yes1", "yes2"],
        "no": {
            "maybe": "maybe"
        }
    }


    jsonWriter.readJSON();

    jsonWriter.writeJSON(req, res, rawString);

};

exports.renderHome = function(req, res){
    res.render('index', {
        partials: {
            part: 'part'
        }
    });
}