app = angular.module('prevent');

app.controller('NoteModalController', function ($scope, $modalInstance, alarm, note, edit, $http) {
  
  $scope.note = note;
  $scope.alarm = alarm;
  $scope.isEdit = edit || 0;

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.save = function() {
    data = {note: $scope.note};
    $http.post('/alarm/'+alarm.aid+'/'+'close', data).success(function(data,status){
      $scope.alarm.note_id = data.alarm.note_id;
      $scope.alarm.Note = data.alarm.Note;
      // $scope.reset = true;
      // $scope.$emit('alarm:reset');
      $modalInstance.close();
    });
  }
});