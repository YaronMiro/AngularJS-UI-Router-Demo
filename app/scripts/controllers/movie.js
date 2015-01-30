'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('MovieCtrl', ['$scope', '$sce', '$stateParams', '$state', 'Movies', 'selectedMovie', function ($scope, $sce, $stateParams, $state, Movies, selectedMovie) {

    // Selected movie.
    $scope.selectedMovie = selectedMovie;
    $scope.movieTrailerUrl = Movies.gettingMovieTrailerUrl(selectedMovie.trackName, $state.current.data.movie);

  }]);
