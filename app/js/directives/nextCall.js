app.directive("nextCalls", function () {
    return {
        restrict: "E",
        templateUrl: "../view/nextCall.html",
        controller: nextCall,
    };
});
nextCall.$inject = ["$scope"];
function nextCall ($scope) {
      $scope.firstTodo = {};
      Object.assign($scope.firstTodo, $scope.todos[0]);
}
