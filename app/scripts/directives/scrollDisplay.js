'use strict';
angular.module('myApp')
  .directive('scrollDisplay', ['$window', function ($window) {
    return {
      restrict: 'EA',

      link: function (scope) {

        angular.element($window).bind("scroll", function () {
          if (this.pageYOffset >= 100) {
            scope.scrollDisplay = true;
          } else {
            scope.scrollDisplay = false;
          }
          scope.$apply();
        });
      }
    };
  }]);
