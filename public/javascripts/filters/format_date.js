app = angular.module('prevent');

app.filter('formatDate',[function(){
	return function(text){
		return moment(text).format('MM.D.YY hh:mm');
	};
}]);