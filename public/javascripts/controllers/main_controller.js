app = angular.module('prevent');

app.controller('MainController',['$scope','$http', function($scope,$http){
	$scope.showAlarmModal = function(){

	}

	$scope.init = function(){
		$http.get('/alarms').success(function(data){
			$scope.alarms=data.alarms;
		});

		if (NODE_ENV === 'development') {
		    window.socket = io.connect('ws://localhost:3000');
		} else if (NODE_ENV === 'production') {
		    window.socket = io.connect('wss://dry-thicket-1171.herokuapp.com')
		}
		socket.on('connected', function () {
			console.log('connected');
		    logger.debug('Connected');
		});
		socket.on('reset', function (data) {
			console.log('reset');
			console.log(data);
		})
		socket.on('alarm-take', function (data) {
			console.log('alarm-take');
			console.log(data);
		});
		socket.on('alarm-close', function (data) {
			console.log('alarm-close');
			console.log(data);
		});
	}
}]);