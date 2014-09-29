var config = require('./config')();
var connection = require('./connection');
var conn = connection.connection;
var mysql = connection.mysql;

var Sequelize = require('sequelize');
var sequelize = new Sequelize('ng_test','root','');

// Models
var Alerts = sequelize.define('Alerts', {
  aid      : { type : Sequelize.INTEGER, primaryKey : true, autoIncrement : true },
  patient  : Sequelize.STRING,
  level    : Sequelize.ENUM("RED","YELLOW","GREEN"),
  title    : Sequelize.STRING,
  employee : Sequelize.STRING,
  note_id  : Sequelize.INTEGER
});

var Notes = sequelize.define('Notes', {
  id     : { type : Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title  : Sequelize.STRING,
  body   : Sequelize.TEXT
});

sequelize.sync();

/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index');
};

/*
 * GET all alerts
 */
exports.alerts = function(request, response){
  Alerts.all().success(function(alerts){
    return alerts;
  });
  
};

/*
 * GET alert by id
 */
exports.alert = function(request, response){
  var sql = "SELECT * FROM alerts where aid = ?";
  return conn.query(sql,request.params.aid, function(err, rows, fields){
  	if (!err) {
  		return response.send( {ok:1, alert:rows} );
  	};
  	return console.log(err);
  });
};

/*
 * POST Take the Alert for handling by the provided employee name.
 */
exports.alertTake = function(request, response){
  var sql = "UPDATE alerts SET employee = ? WHERE aid = ?";
  var values = [request.body.employee, request.params.aid];
  sql =mysql.format(sql, values);
  return conn.query(sql, function(err, rows, fields){
  	if (!err) {
  		return response.send( {ok:1, alert:rows} );
  	};
  	return console.log(err);
  });
};

/*
 * POST New Note and close associated alert
 */
exports.alertClose = function(request, response){
  return conn.beginTransaction(function(err){
    if (err) {throw err;}
    var sql = "INSERT INTO notes (title,body ) values (?,?)";
    var values = [request.body.note.title, request.body.note.body];
    sql =mysql.format(sql, values);
    conn.query(sql, function(err, rows, fields){
      if(err){
        conn.rollback(function(){
          throw err;
        });
      }
      var sql = "UPDATE alerts SET note_id = ? WHERE aid = ?";
      var values = [rows.insertId, request.params.aid];
      sql =mysql.format(sql, values);
      conn.query(sql, function(err, rows, fields){
        if(err){
          conn.rollback(function(){
            throw err;
          });
        }

        conn.commit(function(err) {
          if (err) { 
            conn.rollback(function() {
              throw err;
            });
          }else{
            return response.send( {ok:1, alert:rows} );
          }
        });
      });
    });
  });
};