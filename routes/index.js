var jsonHandler = require ('../controllers/jsonhandler.js').JSONHandler;
/*
 * GET home page.
 */


exports.index = function(req, res){
    jsonHandler.readJSON(req, res);
};

exports.renderHome = function(req, res, data){

   res.locals.chart = data;

    //if chart data
    //res.locals.chart = [{"title":"hello"}, {"text":"some stuff", "parentNodeId":"1"}];
    res.render('index', {


    });
}



/**TODO: Object should be a) intro area and then an array for choices presented, and the choices themselves need to have linked nodes**/

/**Node: id, title, intro text, choices array**/
/**Choice: id, title, text, nodes array**/