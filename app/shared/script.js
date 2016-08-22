(function () {
    'use strict';
    angular
        .module('myApp', ['ui.bootstrap', 'ui.bootstrap.datetimepicker'])

        .controller('MyController', MyController);

    MyController.$inject = ['$scope', '$http', '$filter'];

    function MyController($scope, $http, $filter) {
        var vm = this;

        vm.saved = localStorage.getItem('todos');
        $scope.todos = (localStorage.getItem('todos') !== null) ? angular.fromJson(vm.saved) : [
            {
                name: 'Lorem',
                phone: '00420 111 222 333',
                time: 1471629211415,
                done: false,
            },
            {
                name: 'Item2',
                phone: '00420 111 222 333',
                time: 1471629211415,
                done: false,
            },
            {
                name: 'Item1',
                phone: '00420 111 222 333',
                time: 1471629211415,
                done: false,
            },
        ];

        localStorage.setItem('todos', angular.toJson($scope.todos));

        $scope.readList = function () {

            $scope.list = localStorage.getItem('todos');
            localStorage.setItem('todos', angular.toJson($scope.todos));
            console.log($scope.list)
        }

        vm.checkNextCall = function () {
            var allTodos = $filter('orderBy')($scope.todos, 'time'),
                currentTime = new Date().getTime(),
                result = allTodos.find(function (todo) {
                    return todo.time >= currentTime;
                });
            return result;
        };
        $scope.nextCallIs = function () {
            $scope.firstTodo = {};
            Object.assign($scope.firstTodo, vm.checkNextCall());
            $scope.firstTodo.time = $filter('date')($scope.firstTodo.time, 'HH:mm');
        };
        
    }
})();
