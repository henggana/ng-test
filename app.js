// Module dependencies
var application_root = __dirname,
	express = require('express'),
	path = require('path'),
	routes = require('./routes'),
	assets = require('./assets');

// Create server
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(application_root, 'views'));
app.set('view engine', 'hjs');
app.use( express.bodyParser() );
app.use( express.methodOverride() );
app.use( app.router );
app.use( assets.middleware );
app.use( express.static( path.join( application_root, 'public') ) );
app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));

if ('development' == app.get('env')) {
	app.use(express.logger('dev'));
	
} else if('production' = app.get('env')) {
	
};

// Routes
app.get( '/', routes.index );
app.get( '/alerts', routes.alerts );
app.get( '/alert/:aid', routes.alert );
app.post( '/alert/:aid/take', routes.alertTake );
app.post( '/alert/:aid/close', routes.alertClose );
// app.get( '/alert/:aid', routes.alert );

//Start server
var port = 4711;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});