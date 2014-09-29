var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('notes', {
	    id: { type: 'int', primaryKey: true ,autoIncrement: true},
	    title: 'string',
	    body: 'string',
	  }, callback);
};

exports.down = function(db, callback) {

};
