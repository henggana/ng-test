var config = require('../config')();

/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index');
};

/*
 * GET alerts
 */
exports.alerts = function(req, res){
  // res.render('index');
  res.send( 'Alerts API is running' );
  // console.log();
};