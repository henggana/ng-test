app = angular.module('prevent');

app.controller('MainController',['$scope','$http', function($scope,$http){
	$scope.showAlertModal = function(){

	}

	// $scope.init();
	$scope.init = function(){
		console.log('alertstable initialize');
		$http.get('/alerts').success(function(data){
			$scope.alerts=data.alerts;
		});
	}
}]);