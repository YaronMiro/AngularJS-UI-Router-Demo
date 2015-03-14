'use strict';

angular.module('myApp')
  .directive('nextPreviousMovie', ['$state', '$filter', function ($state, $filter) {
    return {
      template: '<button ng-click="changeSelectedMovie()" class="link {{ class }}"></button>',
      replace: true,
      scope: {
        operator: '@',
        selectedMovieIndex: '=',
        movies: '=',
        viewName: '='
      },
      link: function (scope, element, attrs) {

        // Defaults.
        scope.class =  scope.operator == '>' ? 'fa fa-chevron-circle-right next' : 'fa fa-chevron-circle-left previous';
        var index = scope.selectedMovieIndex;

        scope.changeSelectedMovie = function() {

          // Proceed to next movie if it exists.
          if (index != scope.movies.length && scope.operator == '>') {
            index = index + 1;
          }
          // Proceed to previous movie if it exists.
          else if (index > 1 && scope.operator == '<') {
            index = index - 1;
          }

          var selectedMovie = $filter('filter')(scope.movies, {index: index});
          var selectedMovie = selectedMovie[0];
          $state.go(scope.viewName, {'name': selectedMovie.urlAlias})
        }
      }
    };
  }]);
