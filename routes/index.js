var jsonHandler = require ('../controllers/jsonhandler.js').JSONHandler,
    dataModel = require('../controllers/datamodel.js').DataModel,
    state = require('../controllers/state.js'),
    chartFormatter = require('../controllers/chart.js'),
    comm = require('../controllers/comm.js');
/*
 * GET home page.
 */


exports.index = function(req, res){
    jsonHandler.readJSON(req, res);
};

exports.renderHome = function(req, res){

    var newData = chartFormatter.convert(dataModel.currentData);
    console.dir(dataModel.currentData)

    var curState = state.getState();

    for (var key in curState){
        newData[key] = curState[key];
    }

    res.locals.data = newData;

    //if callback need to send back the html
    res.render('index', {title: 'home'}, function(err, html){

        console.log('done rendering')
//        console.dir(newData)
        res.send(html);
        comm.send('graph',newData);

    });
}



/**TODO: Object should be a) intro area and then an array for choices presented, and the choices themselves need to have linked nodes**/

/**Node: id, title, intro text, choices array**/
/**Choice: id, title, text, nodes array**/