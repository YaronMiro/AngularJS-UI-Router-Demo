'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('movieController', ['$state', 'Movies', 'selectedMovie', 'moviesData','Bookmarks', function ($state, Movies, selectedMovie, moviesData, Bookmarks) {

    var self = this;

    // Array of movies.
    self.movies = moviesData;

    // Bookmarks service object.
    self.bookmarksService = Bookmarks;

    // Selected movie.
    self.selectedMovie = selectedMovie;

    // Movie trailer.
    self.movieTrailerUrl = Movies.gettingMovieTrailerUrl(self.selectedMovie.trackName, $state.current.data.trailer);

  }]);
