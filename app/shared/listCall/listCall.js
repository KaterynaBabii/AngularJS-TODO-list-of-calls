(function () {
    'use strict';
    angular
        .module('myApp')
        .directive('listCalls', listCalls);

    function listCalls () {
        var directive = {
            restrict: 'E',
            templateUrl: '../shared/listCall/listCalls.html',
            controller: ListCall,
        };
        return directive;
    }
    ListCall.$inject = ['$filter', '$scope',];
    function ListCall ($filter, $scope) {
        var oldTodos = $scope.todos;
        var currentdate = new Date();

        $scope.updateTodo = function () {
            localStorage.setItem('todos', angular.toJson($scope.todos));
        };

        $scope.allCalls = function () {
            $scope.todos = oldTodos;
        };
        $scope.nextCall = function () {
            angular.forEach(oldTodos, function (oldTodos, todo) {
                var datetime = new Date(oldTodos.time);
                if (datetime.getTime() > currentdate.getTime()) {
                    oldTodos.done = false;
                }
            });
        };
        $scope.disabledCall = function () {
            angular.forEach(oldTodos, function (oldTodos, todo) {
                var datetime = new Date(oldTodos.time);
                if (datetime.getTime() <= currentdate.getTime()) {
                    oldTodos.done = true;
                }
            });
        };

        $scope.sortKey = '-time';
        $scope.reverse = true;

        // Remove Call
        $scope.removeCall = function (x) {
            $scope.todos.splice(x, 1);
            $scope.updateTodo();
        };
        // Sort by field
        $scope.sort = function (sortKey) {
            $scope.reverse = ($scope.sortKey === sortKey) ? !$scope.reverse : false;
            $scope.sortKey = sortKey;
        };

        //Show Next Finished and All calls
        $scope.showFn = function (todo) {
            $scope.allCalls();
            $scope.disabledCall();
            $scope.nextCall();
            if ($scope.show === 'All') {
                return true;
            } else if (todo.done && $scope.show === 'finished') {
                return true;
            } else if (!todo.done && $scope.show === 'next') {
                return true;
            } else {
                return false;
            }
        };
        // $scope.showFn = true;

    }
})();


