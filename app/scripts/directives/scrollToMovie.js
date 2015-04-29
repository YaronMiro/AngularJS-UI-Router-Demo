'use strict';
angular.module('myApp')
  .directive('scrollToMovie', ['$document', function ($document) {
    return {
      restrict: 'EA',
      scope: {
        movieId: '=',
      },
      link: function (scope, element) {

        scope.$watch('movieId', function(id){
          console.log(id);

          var scrollToMovie = function(id) {
            var element = angular.element(document.getElementById(id));
            console.log(element);
            $document.scrollToElementAnimated(element)
          }

          element.bind('click', scrollToMovie(id));
        });
      }
    };
  }]);
