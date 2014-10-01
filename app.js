var express = require('express')
  , http    = require('http')
  , path    = require('path')
  , db      = require('./models')
  , assets  = require('./assets')
  , routes  = require('./routes');

var app      = express();
var io_proxy = require('./io_proxy');

app.set( 'port', process.env.PORT || 3000);
app.set( 'views', path.join(__dirname, 'views'));
app.set( 'view engine', 'hjs');
app.use( express.favicon());
app.use( express.json())
app.use( express.urlencoded())
app.use( express.bodyParser() );
app.use( express.methodOverride() );
app.use( app.router );
app.use( assets.middleware );
app.use( express.static( path.join( __dirname, 'public') ) );

if ('development' == app.get('env')) {
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
	app.use(express.logger('dev'));
};

app.get( '/', routes.index );

var initServer = function () {
	var server = http.createServer(app);

	var io = require('socket.io').listen(server);
	io_proxy.io = io;

	if ('development' == app.get('env')) {

		// Socket IO configuration
		io.set('transports', [
		    'websocket'
		    , 'flashsocket'
		    , 'htmlfile'
		    , 'xhr-polling'
		    , 'jsonp-polling',
		    , 'polling'
		]);
	}

	io.set('log level', 1); // reduce logging

	var reset   = require('./routes/reset')
	  , alarm   = require('./routes/alarm')
	  , note    = require('./routes/note');

	app.get( '/reset', reset.index );
	app.get( '/alarms', alarm.getAll );
	app.post( '/alarm', alarm.create );
	app.get( '/alarm/:aid', alarm.getById );
	app.post( '/alarm/:aid/take', alarm.take );
	app.post( '/alarm/:aid/close', alarm.close );

	io.sockets.on('connection', function (socket) {
		socket.emit('connected');
		  // socket.on('reset', function () {
		  // 	// TODO: DB handlers
		  // 	socket.broadcast.emit('reset');
		  // });
		  // socket.on('alert-take', function (alarmId, employeeId) {
		  // 	socket.broadcast.emit('alert-take', alarmId, employeeId);
		  // });
		  // socket.on('alert-close', function (alarmId) {
		  // 	socket.broadcast.emit('alert-close', alarmId);
		  // });
	});

	server.listen(app.get('port'), function(server){
		console.log('Express server listening on port %d in %s mode', app.get('port'), app.settings.env)
	});
};

db
.sequelize
.sync({force:true})
.complete(function(err){
	if(err){
		throw err[0];
	} else {
		db.Alarm.bulkCreate([
			{ patient:"John"  , level:"RED"   , title:"Someone knocking my window" },
			{ patient:"Doe"   , level:"YELLOW", title:"Please turn on the telly" },
			{ patient:"Dvorak", level:"GREEN" , title:"I need to call my wife" }
		]).success(initServer);
	}
});