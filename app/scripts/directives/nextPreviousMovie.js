'use strict';

angular.module('myApp')
  .directive('nextPreviousMovie', function () {
    return {
      template: '<button ng-click="changeSelectedMovie()" class="btn btn-default {{ class }}"></button>',
      replace: true,
      scope: {
        operator: '@',
        selectedMovieIndex: '='
      },
      link: function (scope) {
        scope.class =  scope.operator == '>' ? 'fa fa-chevron-circle-right' : 'fa fa-chevron-circle-left';
        var length = 30;

        scope.changeSelectedMovie = function() {
          var index = scope.selectedMovieIndex;

          if (index != length && scope.operator == '>') {
            console.log(index + 1);
          }
          else if (index && scope.operator == '<') {
            console.log(index -1 );
          }
          console.log(scope.selectedMovie);
        }
      }
    };
  });
