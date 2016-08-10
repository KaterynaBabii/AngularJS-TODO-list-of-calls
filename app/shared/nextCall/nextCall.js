(function () {
    'use strict';
    angular
        .module('myApp')
        .directive('nextCalls', nextCalls);

    function nextCalls () {
        var directive = {
            restrict: 'E',
            templateUrl: '../shared/nextCall/nextCall.html',
            controller: NextCall,
        };
        return directive;
    }
    NextCall.$inject = ['$scope','$filter'];

    function NextCall ($scope, $filter) {
        // $scope.nextCall();
    }
})();