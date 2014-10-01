app = angular.module('prevent');

app.directive('alarmItem',['$modal','$http',function($modal, $http){
return {
	restrict: 'A',
	templateUrl : "templates/alarm_item.html",
	scope: {
		alarm: "="
	},

	link:function($scope,$element,attrs){
		$scope.alarm.alarmColor = ($scope.alarm.level).toLowerCase();

		$scope.$watch('alarm.note_id',function(){
			$scope.alarmHandled = $scope.alarm.note_id != null;			
		});

		$scope.alarm.patient = "A Patient";

	},

	controller: function($scope, $element){
		$scope.showAssignModal = function(){
			var modalInstance = $modal.open({
		      templateUrl: 'templates/assign_modal.html',
		      controller: 'AssignModalController',
		      resolve: {
		        alarm: function () {
		          return $scope.alarm;
		        }
		      },
		    });

		    // modalInstance.result.then(function (selectedItem) {
		    //   // $scope.selected = selectedItem;
		    // }, function () {
		    //   // $log.info('Modal dismissed at: ' + new Date());
		    // });
		}

		$scope.showNoteModal = function(edit){
			var modalInstance = $modal.open({
		      templateUrl: 'templates/note_modal.html',
		      controller: 'NoteModalController',
		      resolve: {
		        alarm: function () {
		          return $scope.alarm;
		        },
		        note: function () {
		        	if ($scope.alarm.Note != null)
						return $scope.alarm.Note;		   
					else
						return {};     		
		        },
		        edit: function() {
		        	return edit;
		        }
		      },
		    });

		    modalInstance.result.then(function () {
		      // $scope.selected = selectedItem;
		      $scope.reset = true;
		      $scope.$emit('alarm:reset');
		    }, function () {
		      // $log.info('Modal dismissed at: ' + new Date());
		    });
		}
	}
}

}]);