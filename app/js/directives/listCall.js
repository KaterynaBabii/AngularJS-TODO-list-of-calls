(function() {
    'use strict';
    angular
        .module('myApp')
        .directive('listCalls', listCalls);

        function listCalls () {
            var directive = {
                restrict: 'E',
                templateUrl: '../view/listCalls.html',
                controller: ListCall,
            };
            return directive;
        }
        ListCall.$inject = ['$filter', '$scope'];
        function ListCall ($filter, $scope) {
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


