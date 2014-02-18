
/**
 * Module dependencies.
 */

var express = require('express'),
    hbrs = require('express3-handlebars'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    postHandler = require('./controllers/posthandler.js').PostHandler,
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    comm = require('./controllers/comm.js');

app.engine('html', hbrs({extname:'.html'}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.enable('view cache');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


    app.get('/', routes.index);
//    app.get('/users', user.list);
    app.post('/', postHandler.processForm);


comm.init(io);


server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



