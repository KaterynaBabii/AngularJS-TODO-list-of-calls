(function() {
    'use strict';
    angular
        .module('myApp')
        .directive('nextCalls', nextCalls);

    function nextCalls () {
        var directive = {
            restrict: 'E',
            templateUrl: '../view/nextCall.html',
            controller: NextCall,
        };
        return directive;
    }
    NextCall.$inject = ['$scope','$filter'];

    function NextCall ($scope, $filter) {
        $scope.nextCall();
        $scope.firstTodo.time =  $filter('date')($scope.firstTodo.time, 'HH:mm');
    }
})();