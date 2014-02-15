/**
 * Created by salpy on 2014-02-09.
 */

var render = require('../routes/index.js'),

    dataModel = require('./datamodel.js').DataModel,

    chartFormatter = require('./chart.js');

var PostHandler = {
    processForm: function(req, res){

        console.log(req.body.nodeId)
        console.log(req.body.title)
        console.log(req.body.copy)
        console.log(req.body.choice1)
        console.log(req.body.choice2)



        //if node doesn't exist yet in the data model, create it, otherwise update it


        dataModel.addStoryNode(req.body.nodeId, req.body.title, req.body.copy, req.body.choice1, req.body.choice2);

        var data = chartFormatter.render(dataModel.currentData);


        render.renderHome(req, res, data);
    }
}


exports.PostHandler = PostHandler;