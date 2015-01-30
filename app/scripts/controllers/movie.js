'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('MovieCtrl', ['$scope', '$stateParams', '$state', 'Movies', 'selectedMovie', function ($scope, $stateParams, $state, Movies, selectedMovie) {

    // Selected movie.
    $scope.selectedMovie = selectedMovie;
    // Movie trailer.
    $scope.movieTrailerUrl = Movies.gettingMovieTrailerUrl(selectedMovie.trackName, $state.current.data.movie);

  }]);
