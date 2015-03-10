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

          function next() {
            return index == (length -1) ? scope.selectedMovieIndex : scope.selectedMovieIndex + 1;
          };
          function previous() {
            return index == 0 ? scope.selectedMovieIndex :  scope.selectedMovieIndex - 1;
          };
          scope.operator == '>' ? console.log(next()): console.log(previous());
        }


      }
    };
  });
