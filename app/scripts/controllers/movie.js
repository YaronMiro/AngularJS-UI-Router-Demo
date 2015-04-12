'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('movieController', ['$scope', '$stateParams', '$state', 'Movies', 'selectedMovie', 'movies', function ($scope, $stateParams, $state, Movies, selectedMovie, movies) {

    var self = this;

    // Selected movie.
    self.selectedMovie = selectedMovie;

    // Array of movies.
    self.movies = movies;

    // Verify that we have the data object declared.
    if (angular.isDefined($state.current.data)) {
      // Movie trailer.
      self.movieTrailerUrl = Movies.gettingMovieTrailerUrl(self.selectedMovie.trackName, $state.current.data.movie);
    }
  }]);
