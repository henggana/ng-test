app = angular.module('prevent');

app.directive('assignModal',[function(){
	return {
		restrict: "A",
		templateUrl: "templates/assign_modal.html",

		controller: function($scope, $element){
			$scope.save = function(){
				$element.find('button.close').trigger('click');
			}		
		}

	}
}]);