'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('MovieCtrl', ['$scope', '$stateParams', '$state', 'Movies', 'selectedMovie', 'movies', function ($scope, $stateParams, $state, Movies, selectedMovie, movies) {

    // Selected movie.
    $scope.selectedMovie = selectedMovie;
    $scope.movies = movies;

    // Verify that we have the data object declared.
    if (angular.isDefined($state.current.data)) {
      // Movie trailer.
      $scope.movieTrailerUrl = Movies.gettingMovieTrailerUrl(selectedMovie.trackName, $state.current.data.movie);
    }
  }]);
