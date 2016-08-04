angular.module("myApp")
 .directive("addCall", function () {
     return {
        restrict: "E",
        templateUrl: "../view/addCall.html",
    };
 })
.controller("addCall", ["$scope", function ($scope) {
    $scope.validFormat = function () {
        $scope.str = $scope.todoPhone.replace(/\s/g, "");
        $scope.hasDuplicates = (/([()-]).*?\1/).test($scope.str);
        $scope.pattern = (/^00|\+[0-9-()]{7}[0-9]*$/).test($scope.str);
        $scope.hasLetter = (/\[a-zA-z]/).test($scope.str);
        if (!$scope.hasDuplicates && $scope.pattern && !$scope.hasLetter) {
                $scope.newstr = $scope.str.replace(/[ ()-]/g, "");
                $scope.phones = $scope.newstr.replace(/^\+/, "00");
                $scope.phoneNum = $scope.phones.replace(/([\d]{5})([\d]{3})([\d]{3})([\d]{3})/g, "$1 $2 $3 $4");
                $scope.forms.phoneNum.$setValidity("format", true);
        } else {
                $scope.forms.phoneNum.$setValidity("format", false);
                return;
            }
    };
    $scope.addCalls = function () {
        if ($scope.todoName && $scope.todoPhone && $scope.todoTime) {
            $scope.todos.push({
                name: $scope.todoName,
                phone: $scope.phoneNum,
                time: $scope.todoTime,
                done: false,
            });
            $scope.todoName = "";
            $scope.todoPhone = "";
            $scope.todoTime = "";

            localStorage.setItem("todos", JSON.stringify($scope.todos));
        }
    };
},]);