var jsonHandler = require ('../controllers/jsonhandler.js').JSONHandler;
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


    jsonHandler.readJSON(req, res);

   // jsonHandler.writeJSON(req, res, rawString);

};

exports.renderHome = function(req, res, data){

    res.locals.stories =  data;
    res.render('index', {

        partials: {
            stories: 'stories',
            part: 'part'
        }
    });
}



/**TODO: Object should be a) intro area and then an array for choices presented, and the choices themselves need to have linked nodes**/

/**Node: id, title, intro text, choices array**/
/**Choice: id, title, text, nodes array**/