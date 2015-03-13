'use strict';

angular.module('myApp')
  .directive('nextPreviousMovie', function (Movies) {
    return {
      template: '<div ng-click="changeSelectedMovie()" class="{{ class }}"></div>',
      replace: true,
      link: function (scope, element, attrs) {
        scope.class =  scope.operator == '>' ? 'fa fa-chevron-circle-right' : 'fa fa-chevron-circle-left';
        var length = 30;

        console.log(scope.selectedMovie);
        console.log(scope.movies);

        Movies.gettingMovies(30).then(function(data){
          var movies = data
          console.log(movies);

        });
        return;

        scope.changeSelectedMovie = function() {
          var index = scope.selectedMovie.index;

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
