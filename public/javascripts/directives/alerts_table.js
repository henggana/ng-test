app = angular.module('prevent');

app.directive('alertsTable',[function(){
return {
	restrict: 'A',
	templateUrl : "templates/alerts_table.html",

	scope: {
		alerts: "=",
	},
	link:function($scope,$element,attrs){
	},

	controller: function($scope, $element){
	}
}

}]);