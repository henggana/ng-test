var db = require('../models')
var io_proxy = require('../io_proxy');

exports.create = function(request, response){
	db.Alarm.create(
	{	
		title:request.body.alarm.title ,
		level:request.body.alarm.level
	}
	).success(function(alarm){
		return response.send( {ok:1, alarm:alarm} );
	});
}

exports.getAll = function(request, response){
	db.Alarm.findAll({
		include: [ db.Note ]
	}).success(function(alarms) {
		return response.send( {ok:1, alarms:alarms} );
	})
};

exports.getById = function(request, response){
	db.Alarm.find({
		where   : { aid : request.params.aid },
		include : [ db.Note ]
	}).success(function(alarm) {
		if (alarm)
			return response.send( {ok:1, alarm:alarm} );
		else 
			return response.send( {ok:0, error:"not found"} );
	}).error(function(errors){
		return response.send( {ok:0, error:"not found"} );
	});
};

exports.take = function(request, response){
	db.Alarm.find(request.params.aid,{
		include: [ db.Note ]
	}).success(function(alarm) {
		alarm.updateAttributes({
			employee: request.body.employee
		}).success(function(){
			io_proxy.broadcast('alarm-take',{alarm:alarm});
			return response.send( {ok:1, alarm:alarm} );
		});
	}).error(function(errors){
		return response.send( {ok:0, error:"not found"} );
	});
};

exports.close = function(request, response){
	console.log(request.body);
	db.Alarm.find({
		where   : { aid : request.params.aid },
		include : [ db.Note ]
	}).success(function(alarm) {
		db.Note.create(
			{	
				title:request.body.note.title ,
				body:request.body.note.body
			}
		).success(function(note){
			alarm.updateAttributes({
				note_id: note.id,
			}).success(function(alarm){
				db.Alarm.find({
					where   : { aid : alarm.aid },
					include : [ db.Note ]
				}).success(function(alarm) {
					io_proxy.broadcast('alarm-close',{alarm:alarm});
					return response.send( {ok:1, alarm:alarm} );
				});
			});
			
		});
	}).error(function(errors){
		return response.send( {ok:0, error:"not found"} );
	});
};