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

    // Array of movies.
    self.movies = movies;

    // Selected movie.
    self.selectedMovie = selectedMovie;

    // Movie trailer.
    self.movieTrailerUrl = Movies.gettingMovieTrailerUrl(self.selectedMovie.trackName, $state.current.data.trailer);

  }]);
