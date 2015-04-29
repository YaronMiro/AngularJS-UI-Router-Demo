'use strict';
angular.module('myApp')
  .directive('scrollToMovie', ['$document', function ($document) {
    return {
      restrict: 'EA',
      scope: {
        movieId: '=',
        offset: '='
      },
      link: function (scope, element) {

        var scrollToMovie = function(id, offset) {
          var offset = angular.isDefined(offset) ? offset: 90;
          var element = angular.element(document.getElementById(id));
          $document.scrollToElementAnimated(element, offset)
          console.log(offset);
        }

        element.bind('click', scrollToMovie(948537335, scope.offset));

      }
    };
  }]);
