'use strict';
angular.module('myApp')
  .directive('scrollToMovie', ['$document', function ($document) {
    return {
      restrict: 'EA',
      scope: {
        movie: '='
      },
      link: function (scope, element) {

        element.bind('click', function(){

          // Make the "summary" view visible.
          console.log(scope.movie);
          scope.movie.viewMode = !scope.movie.viewMode;

          // Get the movie wrapper.
          var movieElementId = '#' + scope.movie.id;
          var elementMovieWrapper = angular.element(movieElementId);


          // Restore opacity.
          elementMovieWrapper.css('opacity', 1.0);

          // Target all of the "movie-wrapper" siblings and set their opacity.
          var siblings = angular.element('.movies-wrapper:not(' + movieElementId +')');
          angular.forEach(siblings, function(element){
            angular.element(element).css('opacity', 0.2);
          });

         // scroll to target movie.
         $document.scrollToElementAnimated(elementMovieWrapper, 160, 800);
      });
      }
    };
  }]);
