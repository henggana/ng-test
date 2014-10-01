var db = require('../models');
var io_proxy = require('../io_proxy');

 
exports.index = function(req, res){
  db
	.sequelize
	.sync({force:true})
	.complete(function(err){
		if(err){
			throw err[0];
		} else {
			db.Alarm.bulkCreate([
				{ patient:"A Patient", level:"RED"   , title:"Someone knocking my window" },
				{ patient:"A Patient", level:"YELLOW", title:"Please turn on the telly" },
				{ patient:"A Patient", level:"GREEN" , title:"I need to call my wife" }
			]).success(function(){
				io_proxy.broadcast('reset',{});
				return res.send( { ok : 1 } );
			});
		}
	});
}