var express = require('express')
  , routes  = require('./routes')
  , reset   = require('./routes/reset')
  , alert   = require('./routes/alert')
  , note    = require('./routes/note')
  , http    = require('http')
  , path    = require('path')
  , db      = require('./models')
  , assets  = require('./assets');

var app = express();

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
app.get( '/reset', reset.index );
app.get( '/alerts', alert.getAll );
app.get( '/alert/:aid', alert.getById );
app.post( '/alert/:aid/take', alert.take );
app.post( '/alert/:aid/close', alert.close );

db
.sequelize
.sync({force:true})
.complete(function(err){
	if(err){
		throw err[0];
	} else {
		db.Alert.bulkCreate([
			{ patient:"John"  , level:"RED"   , title:"Someone knocking my window" },
			{ patient:"Doe"   , level:"YELLOW", title:"Please turn on the telly" },
			{ patient:"Dvorak", level:"GREEN" , title:"I need to call my wife" }
		]).success(function(){
			http.createServer(app).listen(app.get('port'), function(){
				console.log('Express server listening on port %d in %s mode', app.get('port'), app.settings.env)
			});
		});
	}
});