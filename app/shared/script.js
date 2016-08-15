(function () {
    'use strict';
    angular
        .module('myApp', [])
        .controller('MyController', MyController);

    MyController.$inject = ['$scope', '$http', '$filter'];

    function MyController($scope, $http, $filter) {

        $scope.saved = localStorage.getItem('todos');
        $scope.todos = (localStorage.getItem('todos') !== null) ? angular.fromJson($scope.saved) : [
            {
                name: 'Lorem',
                phone: '00420 111 222 333',
                time: '1970-01-01T11:09:00.000Z',
                done: false,
            },
            {
                name: 'Item2',
                phone: '00420 111 222 333',
                time: '1970-01-01T06:09:00.000Z',
                done: false,
            },
            {
                name: 'Item1',
                phone: '00420 111 222 333',
                time: '1970-01-01T21:09:00.000Z',
                done: false,
            },];

        localStorage.setItem('todos', angular.toJson($scope.todos));
        $scope.readList = function () {
            $scope.list = localStorage.getItem('todos');
        }
        $scope.readList();
        var oldTodos = $scope.todos;

        $scope.nextCallIs = false;
        $scope.currentdate = new Date();
        $scope.date = $filter('date')(new Date(), 'yyyy-MM-dd');

        // All / NEXT / FINISHED button
        $scope.allCalls = function () {
            $scope.todos = oldTodos;
        };
        $scope.disabledCall = function () {
            $scope.todos = [];
            angular.forEach(oldTodos, function (oldTodos, todo) {
                var oldData = new Date(oldTodos.time); // Date {Thu Jan 01 1970 11:05:00 GMT+0200 (FLE Daylight Time)}
                var getUserTime = $filter('date')(oldData, 'HH:mm'); // 02:15
                var datetime = new Date($scope.date + 'T' + getUserTime + ':00+0300'); // user's call full date
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
                    getUserTime = $filter('date')(oldData, 'HH:mm'),
                    datetime = new Date($scope.date + 'T' + getUserTime + ':00+0300');
                if (datetime.getTime() > $scope.currentdate.getTime()) {
                    $scope.todos.push(oldTodos);
                }
                $scope.todos = $filter('orderBy')($scope.todos, 'time');
                $scope.firstTodo = {};
                Object.assign($scope.firstTodo, $scope.todos[0]);
                $scope.firstTodo.time = $filter('date')($scope.firstTodo.time, 'HH:mm');
            });
        };
    }
})();
