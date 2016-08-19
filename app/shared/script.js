(function () {
    'use strict';
    angular
        .module('myApp', ['ui.bootstrap', 'ui.bootstrap.datetimepicker'])
        .constant('CONSTS', {
            TIMEFILTER: {
                ALL: 0,
                FINISHED: 1,
                NEXT: 2
            }
        })
        .controller('MyController', MyController);

    MyController.$inject = ['$scope', '$http', '$filter'];

    function MyController($scope, $http, $filter) {

        $scope.saved = localStorage.getItem('todos');
        $scope.todos = (localStorage.getItem('todos') !== null) ? angular.fromJson($scope.saved) : [
            {
                name: 'Lorem',
                phone: '00420 111 222 333',
                time: new Date("2016-08-19T12:00:00"),
                done: false,
            },
            {
                name: 'Item2',
                phone: '00420 111 222 333',
                time: new Date("2016-08-19T21:00:00"),
                done: false,
            },
            {
                name: 'Item1',
                phone: '00420 111 222 333',
                time: new Date("2016-08-19T17:00:00"),
                done: false,
            },];

        localStorage.setItem('todos', angular.toJson($scope.todos));

        // timePicker params
        $scope.todoTime = '';
        $scope.timePickerIsOpen = false;
        $scope.timePattern = '([01]\\d|2[0-3]):?([0-5]\\d)';
        $scope.timeOptions = {
            readonlyInput: false,
            showMeridian: false
        };
        $scope.openCalendar = function () {
            $scope.timePickerIsOpen = true;
        };
        //end timePicker params

        $scope.readList = function () {
            $scope.list = localStorage.getItem('todos');
            return $scope.todos
        }
        console.log($scope.readList());
        // console.log(new Date(1288323623006))

         var oldTodos = $scope.todos
$scope.currentdate = new Date();
        // All / NEXT / FINISHED button
        $scope.allCalls = function () {
            $scope.todos = oldTodos;
            console.log($scope.todos)
        };
        $scope.nextCall = function () {
            $scope.todos = [];
            angular.forEach(oldTodos, function (oldTodos, todo) {
                var datetime = new Date(oldTodos.time);
                if (datetime.getTime() > $scope.currentdate.getTime()) {
                    $scope.todos.push(oldTodos);
                }
                $scope.todos = $filter('orderBy')($scope.todos, 'time');
                // console.log($scope.todos)
                $scope.firstTodo = {};
                Object.assign($scope.firstTodo, $scope.todos[0]);
                $scope.firstTodo.time = $filter('date')($scope.firstTodo.time, 'HH:mm');
            });

        };
        $scope.disabledCall = function () {
            $scope.todos = [];
            angular.forEach(oldTodos, function (oldTodos, todo) {
                var datetime = new Date(oldTodos.time);
                if (datetime.getTime() <= $scope.currentdate.getTime()) {
                    oldTodos.done = true;
                    $scope.todos.push(oldTodos);
                } else
                    oldTodos.done = false;
            });

        };


        // timePicker params
        $scope.todoTime = '';
        $scope.timePickerIsOpen = false;
        $scope.timePattern = '([01]\\d|2[0-3]):?([0-5]\\d)';
        $scope.timeOptions = {
            readonlyInput: false,
            showMeridian: false
        };
        $scope.openCalendar = function () {
            $scope.timePickerIsOpen = true;
        };
        //end timePicker params

    }
})();
