app = angular.module('prevent');

app.directive('alarmsTable',[function(){
return {
	restrict: 'A',
	templateUrl : "templates/alarms_table.html",

	scope: {
		alarms: "=",
	},
	link:function($scope,$element,attrs){
	},

	controller: function($scope, $element){
	}
}

}]);