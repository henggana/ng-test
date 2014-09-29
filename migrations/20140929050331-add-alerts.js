var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('alerts', {
	    aid: { type: 'int', primaryKey: true },
	    patient: 'string',
	    level: 'string',
	    title: 'string',
	    employee: 'string',
	    note_id: 'int'
	  }, callback);
};

exports.down = function(db, callback) {

};
