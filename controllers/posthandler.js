/**
 * Created by salpy on 2014-02-09.
 */

var render = require('../routes/index.js');

var PostHandler = {
    processForm: function(req, res){

        console.log(req.body.title)
        console.log(req.body.copy)
        render.renderHome(req, res);
    }
}


exports.PostHandler = PostHandler;