'use strict';

angular.module('myApp')
  .directive('movieLink', ['$state', '$filter', function ($state, $filter) {
    return {
      restrict: 'A',
      scope: {
        movieLink: '@',
        selectedMovieIndex: '=',
        movies: '='
      },
      link: function (scope, element) {

        // Defaults.
        var index = scope.selectedMovieIndex;
        var viewName = $state.current.name;

        var changeSelectedMovie = function() {
          // Proceed to next movie if it exists.
          if (index != scope.movies.length && scope.movieLink == 'next') {
            index = index + 1;
          }
          // Proceed to previous movie if it exists.
          else if (index > 1 && scope.movieLink == 'previous') {
            index = index - 1;
          }

          var selectedMovie = $filter('filter')(scope.movies, {index: index});
          var selectedMovie = selectedMovie[0];

          $state.go(viewName, {'name': selectedMovie.urlAlias});
        }
        element.bind('click', changeSelectedMovie);
      }
    };
  }]);
