(function () {
    'use strict';
    angular
        .module('myApp')
        .directive('listCalls', listCalls);

    function listCalls() {
        var directive = {
            restrict: 'E',
            templateUrl: '../shared/listCall/listCalls.html',
            controller: ListCall,
        };
        return directive;
    }
    ListCall.$inject = ['$filter', '$scope'];
    function ListCall($filter, $scope) {

        var oldTodos = $scope.todos;
        var currentdate = new Date();


        $scope.allCalls = function () {
            $scope.todos = oldTodos;
            console.log($scope.todos);
        };

        $scope.disabledCall = function () {
            $scope.todos = [];
            angular.forEach(oldTodos, function (oldTodos, todo) {
                var datetime = new Date(oldTodos.time);
                if (datetime.getTime() <= currentdate.getTime()) {
                    oldTodos.done = true;
                    $scope.todos.push(oldTodos);
                } else
                    oldTodos.done = false;
            });
        };

        $scope.nextCall = function () {
            $scope.todos = [];
            angular.forEach(oldTodos, function (oldTodos, todo) {
                var datetime = new Date(oldTodos.time);
                if (datetime.getTime() > currentdate.getTime()) {
                    $scope.todos.push(oldTodos);
                }
            });
        };

        $scope.sortKey = '-time';
        $scope.reverse = true;

        // Remove Call
        $scope.removeCall = function (x) {
            $scope.todos.splice(x, 1);
            localStorage.setItem('todos', angular.toJson($scope.todos));
        };
        // Sort by field
        $scope.sort = function (sortKey) {
            $scope.reverse = ($scope.sortKey === sortKey) ? !$scope.reverse : false;
            $scope.sortKey = sortKey;
        };
    }
})();


