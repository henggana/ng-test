app = angular.module('prevent');

app.directive('alarmModal',['$http',function($http){
	return {
		restrict: 'A',
		templateUrl : "templates/alarm_modal.html",

		link:function($scope,$element,attrs){

		},

		controller: function($scope, $element){
			$scope.save = function(){
				data = {alarm: $scope.alarm};
				$http.post('/alarm',data).success(function(data,status){
					// $element.find('button.close').trigger('click');
					$element.modal('hide');
					$element.find('form')[0].reset();
					$scope.alarms.push(data.alarm);
				});
			}		
		}
	}

}]);