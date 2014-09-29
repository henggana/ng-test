// Module dependencies
var application_root = __dirname,
	express = require('express'),
	path = require('path'),
	mysql = require('mysql'),
	routes = require('./routes/');

// Create server
var app = express();

// mysql connection
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'ng_test'

});

connection.connect(function(err){
	if(err)
		console.log(err);
});

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(application_root, 'views'));
app.set('view engine', 'hjs');
app.use( express.bodyParser() );
app.use( express.methodOverride() );
app.use( app.router );
app.use( express.static( path.join( application_root, 'public') ) );
app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));

if ('development' == app.get('env')) {
	app.use(express.logger('dev'));
	
} else if('production' = app.get('env')) {
	
};

// Routes
app.get( '/', routes.index );
app.get( '/alerts', routes.alerts );

//Start server
var port = 4711;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});