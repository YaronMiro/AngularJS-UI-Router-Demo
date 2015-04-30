'use strict';
angular.module('myApp')
  .directive('scrollToMovie', ['$document', function ($document) {
    return {
      restrict: 'EA',
      scope: {
        movie: '='
      },
      link: function (scope, element) {

        scope.$watch('movie', function(movie){

          var scrollToMovie = function(movie) {

            console.log('test');

            return;

            var id = movie.id;
            var element = angular.element(document.getElementById('main'));
            console.log(element);
            $document.scrollToElementAnimated(element)
          }

          element.bind('click', scrollToMovie(movie));
        });
      }
    };
  }]);
