
var app = angular.module("myApp", []);

app.controller("MyController", ["$scope", "$http", "$filter", function ($scope, $http, $filter) {
    $scope.saved = localStorage.getItem("todos");
    $scope.todos = (localStorage.getItem("todos") !== null) ? JSON.parse($scope.saved) : [
        {
            name: "Lorem",
            phone: "00420 111 222 333",
            time: "12:20",
            done: false,
        },
        {
            name: "Item1",
            phone: "00420 111 222 333",
            time: "12:20",
            done: false,
        }];

    localStorage.setItem("todos", JSON.stringify($scope.todos));


    $scope.nextCallIs = false;
    $scope.currentdate = new Date();
    $scope.date = $filter("date")(new Date(), "yyyy-MM-dd");
   var oldTodos = $scope.todos;
   
   // All / NEXT / FINISHED button
    $scope.allCalls = function () {
        $scope.todos = oldTodos;     
    };
    $scope.disabledCall = function () {
        $scope.todos = [];
        angular.forEach(oldTodos, function (oldTodos, todo) {
            var oldData = new Date(oldTodos.time); // Date {Thu Jan 01 1970 11:05:00 GMT+0200 (FLE Daylight Time)}
            var getUserTime = $filter("date")(oldData, "HH:mm"); // 02:15
            var datetime = new Date($scope.date + "T" + getUserTime + ":00"); // user's call full date
            if (datetime.getTime() < $scope.currentdate.getTime()) {
                oldTodos.done = true;
                $scope.todos.push(oldTodos);
            } else
                oldTodos.done = false;
        });
    };
    $scope.nextCall = function () {
        $scope.todos = [];
        angular.forEach(oldTodos, function (oldTodos, todo) {
            var oldData = new Date(oldTodos.time),
                getUserTime = $filter("date")(oldData, "HH:mm"),
                datetime = new Date($scope.date + "T" + getUserTime + ":00");
            if (datetime.getTime() > $scope.currentdate.getTime()) {
                $scope.todos.push(oldTodos);
            } 
        });
        $scope.todos = $filter("orderBy")($scope.todos, "time");
        $scope.firstTodo = {};
        Object.assign($scope.firstTodo, $scope.todos[0]);
    };
}]);

