app = angular.module('prevent');

app.directive('alertItem',['$modal',function($modal){
return {
	restrict: 'A',
	templateUrl : "templates/alert_item.html",
	scope: {
		alert: "="
	},

	link:function($scope,$element,attrs){
		$scope.alertColor = ($scope.alert.level).toLowerCase();
		$scope.alertHandled = $scope.alert.note_id != null;
	},

	controller: function($scope, $element){
		// $scope.showAssignModal = function(){
		// 	var modalInstance = $modal.open({
		//       templateUrl: 'templates/assign_modal.html',
		//       controller: AssignModalController,
		//       resolve: {
		//         alert: function () {
		//           return $scope.alert;
		//         }
		//       }
		//     });

		//     modalInstance.result.then(function (selectedItem) {
		//       // $scope.selected = selectedItem;
		//     }, function () {
		//       $log.info('Modal dismissed at: ' + new Date());
		//     });
		// }
	}
}

}]);