app = angular.module('prevent');

app.controller('AssignModalController', function ($scope, $modalInstance, alarm, $http) {

  // $scope.items = items;
  // $scope.selected = {
  //   item: $scope.items[0]
  // }
  $scope.alarm = alarm;

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.save = function() {
    data = {employee: $scope.alarm.employee};
    $http.post('/alarm/'+alarm.aid+'/'+'take', data).success(function(data,status){
      $modalInstance.close();
    });
  }
});