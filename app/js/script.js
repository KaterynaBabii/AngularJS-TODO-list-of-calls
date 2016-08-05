
var app = angular.module("myApp", []);


app.directive("nextCall", function () {
    return {
        restrict: "E",
        templateUrl: "view/nextCall.html",
    };
});
app.directive("listCalls", function () {
    return {
        restrict: "E",
        templateUrl: "view/listCalls.html",
    };
});

app.controller("MyController", ["$scope", "$http", "$filter", function ($scope, $http, $filter) {
    $scope.saved = localStorage.getItem("todos");
    $scope.todos = (localStorage.getItem("todos") !== null) ? JSON.parse($scope.saved) : [
        {
            name: "Lorem",
            phone: "00420 111 222 333",
            time: "12:20",
            done: false,
        },];

    localStorage.setItem("todos", JSON.stringify($scope.todos));

    $scope.nextCallIs = false;
    $scope.currentdate = new Date();
    $scope.date = $filter("date")(new Date(), "yyyy-MM-dd");

    // All / NEXT / FINISHED button
    var oldTodos = $scope.todos;

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
        $scope.next1Call = $scope.todos;
        $scope.next1Call.name = $scope.todos[0].name;
        $scope.next1Call.phone = $scope.todos[0].phone;
        $scope.next1Call.time = $scope.todos[0].time;
    };

    // Remove Call
    $scope.removeCall = function (x) {
        $scope.todos.splice(x, 1);
        localStorage.setItem("todos", JSON.stringify($scope.todos));
    };
    // Sort by field
    $scope.sortKey = "-time";
    $scope.reverse = true;
    // $scope.todos = todos;

    $scope.sort = function (sortKey) {
        $scope.reverse = ($scope.sortKey === sortKey) ? !$scope.reverse : false;
        $scope.sortKey = sortKey;
        // $scope.reverse = !$scope.reverse;
    };
},
]);

