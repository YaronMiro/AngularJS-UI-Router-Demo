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
        var length = scope.movies.length;
        var eClass = scope.movieLink;

        // Apply element text.
        element.text(scope.movieLink);
        element.addClass(eClass);

        // In case we are at the "first" or "last" movie disable the irrelevant
        // element from the display and add class to design the disabled style.
        // and exit without further process.
        if (scope.movieLink == 'previous' && index == 1 || scope.movieLink == 'next' && index == length) {
          element.attr('disabled', 'true');
          element.addClass('disabled');
          return;
        }

        var changeSelectedMovie = function() {
          // Proceed to next movie if it exists.
          if (scope.movieLink == 'next' && index != length) {
            index = index + 1;
          }

          // Proceed to previous movie if it exists.
          if (scope.movieLink == 'previous' && index > 1) {
            index = index - 1;
          }

          var selectedMovie = $filter('filter')(scope.movies, {index: index});
          var selectedMovie = selectedMovie[0];
          $state.go(viewName, {'name': selectedMovie.urlAlias});
        }

        // Update element.
        element.bind('click', changeSelectedMovie);

      }
    };
  }]);
