app = angular.module('prevent');

app.directive('alertModal',[function(){
	return {
		restrict: 'A',
		templateUrl : "templates/alert_modal.html",

		link:function($scope,$element,attrs){

		},

		controller: function($scope, $element){
			$scope.save = function(){
				$element.find('button.close').trigger('click');
			}		
		}
	}

}]);