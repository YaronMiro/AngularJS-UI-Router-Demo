'use strict';

angular.module('myApp')
  .directive('nextPreviousMovie', function ($state) {
    return {
      template: '<div ng-click="changeSelectedMovie()" class="link {{ class }}"></div>',
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
          else if (index && scope.operator == '<') {
            index = index -1;
          }

          var url = scope.movies[index].urlAlias;
          $state.go(scope.viewName, {'name': url})
        }
      }
    };
  });
