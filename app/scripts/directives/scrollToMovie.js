'use strict';
angular.module('myApp')
  .directive('scrollToMovie', ['$document', function ($document) {
    return {
      restrict: 'EA',
      scope: {
        itemId: '@'
      },
      link: function (scope, element) {

          var scrollToMovie = function(id) {
            var element = angular.element(document.getElementById(id));
            $document.scrollToElementAnimated(element)
          }

          element.bind('click', scrollToMovie(scope.itemId));
      }
    };
  }]);
