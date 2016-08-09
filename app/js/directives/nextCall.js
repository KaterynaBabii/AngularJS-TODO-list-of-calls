app.directive('nextCalls', function () {
    return {
        restrict: 'E',
        templateUrl: '../view/nextCall.html',
        controller: nextCall,
    };
});
nextCall.$inject = ['$scope','$filter'];
function nextCall ($scope, $filter) {
     var oldTodos = $scope.todos;
      $scope.todos = [];
        angular.forEach(oldTodos, function (oldTodos, todo) {
            var oldData = new Date(oldTodos.time),
                getUserTime = $filter('date')(oldData, 'HH:mm'),
                datetime = new Date($scope.date + 'T' + getUserTime + ':00');
            if (datetime.getTime() > $scope.currentdate.getTime()) {
                $scope.todos.push(oldTodos);
            }
        });
        $scope.todos = $filter('orderBy')($scope.todos, 'time');
        $scope.firstTodo = {};
        Object.assign($scope.firstTodo, $scope.todos[0]);
        $scope.firstTodo.time =  $filter('date')($scope.firstTodo.time, 'HH:mm');

}
