(function () {
    'use strict';
    angular
        .module('myApp', ['ui.bootstrap', 'ngAnimate'])
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
            return $scope.todos
        }
        console.log($scope.readList());

        var oldTodos = $scope.todos

        $scope.todoTime = null;
        $scope.showMe = false;
        $scope.myFunc = function () {
            $scope.showMe = !$scope.showMe;
        }
        $scope.ok = function () {
            $scope.showMe = false;
        };
        $scope.clear = function () {
            $scope.todoTime = null;
        };


        // $scope.time1 = new Date();
        // $scope.showMeridian = true;

        // All / NEXT / FINISHED button
        $scope.allCalls = function () {
            $scope.todos = oldTodos;
        };
        // $scope.nextCall = function () {
        //     $scope.todos = [];
        //     angular.forEach(oldTodos, function (oldTodos, todo) {
        //         var datetime = new Date(oldTodos.time);
        //         if (datetime.getTime() > $scope.currentdate.getTime()) {
        //             $scope.todos.push(oldTodos);
        //         }
        //         // $scope.todos = $filter('orderBy')($scope.todos, 'time');
        //         // // console.log($scope.todos)
        //         // $scope.firstTodo = {};
        //         // Object.assign($scope.firstTodo, $scope.todos[0]);
        //         // $scope.firstTodo.time = $filter('date')($scope.firstTodo.time, 'HH:mm');
        //     });

        // };
        // $scope.disabledCall = function () {
        //     $scope.todos = [];
        //     angular.forEach(oldTodos, function (oldTodos, todo) {
        //         var datetime = new Date(oldTodos.time);
        //         if (datetime.getTime() <= $scope.currentdate.getTime()) {
        //             oldTodos.done = true;
        //             $scope.todos.push(oldTodos);
        //         } else
        //             oldTodos.done = false;
        //     });

        // };

    }
})();
