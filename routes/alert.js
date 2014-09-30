var db = require('../models')

/*
 * GET all alerts
 */
exports.getAll = function(request, response){
	db.Alert.findAll({
		include: [ db.Note ]
	}).success(function(alerts) {
		return response.send( {ok:1, alerts:alerts} );
	})
};

exports.getById = function(request, response){
	db.Alert.find(request.params.aid,{
		include: [ db.Note ]
	}).success(function(alert) {
		return response.send( {ok:1, alert:alert} );
	})
};

exports.take = function(request, response){
	db.Alert.find(request.params.aid,{
		include: [ db.Note ]
	}).success(function(alert) {
		alert.updateAttributes({
			employee: request.body.employee
		}).success(function(){
			return response.send( {ok:1, alert:alert} );
		});
	})
};

exports.close = function(request, response){
	db.Alert.find(request.params.aid,{
		include: [ db.Note ]
	}).success(function(alert) {
		db.Note.create(
			{	
				title:request.body.note.title ,
				body:request.body.note.body
			}
		).success(function(note){
			alert.updateAttributes({
				note_id: note.id,
			}).success(function(){
				return response.send( {ok:1, alert:alert} );
			});
			
		});
	})
};