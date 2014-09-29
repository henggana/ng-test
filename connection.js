var mysql = require('mysql');

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

exports.mysql = mysql;
exports.connection = connection;