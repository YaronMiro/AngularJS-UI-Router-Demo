'use strict';

angular.module('myApp')
  .directive('nextPreviousMovie', ['$state', '$filter', function ($state, $filter) {
    return {
      template: '<button ng-click="changeSelectedMovie()" class="link color-effect {{ class.icon }}"></button>',
      replace: true,
      scope: {
        operator: '@',
        selectedMovieIndex: '=',
        movies: '='
      },
      link: function (scope, element, attrs) {

        // Defaults.
        scope.class =  {};
        scope.class.wrapper = scope.operator == '>' ? 'pull-right next' : 'pull-left previous';
        scope.class.icon =  scope.operator == '>' ? 'fa fa-chevron-circle-right' : 'fa fa-chevron-circle-left';
        var index = scope.selectedMovieIndex;
        var viewName = $state.current.name;

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
          $state.go(viewName, {'name': selectedMovie.urlAlias})
        }
      }
    };
  }]);
