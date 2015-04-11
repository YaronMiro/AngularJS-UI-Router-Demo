'use strict';

angular.module('myApp')
  .factory('Bookmarks', ['localStorageService', function (localStorageService) {

    return {

      /**
       * Save a movie to the local storage  "movies" array.
       * On success return true else return false.
       *
       * @param movie
       *  The movie object {*}.
       *
       * @returns bool
       */
      addToBookmarks: function(movie) {
        // Get array of movies.
        var movies = localStorageService.get('bookmarks') != null ? localStorageService.get('bookmarks') : new Array();
        // Set a new index for the incoming movie.
        movie.index = movies.length ? (movies.length + 1) : 1;

        // Add movie to the array.
        movies.push(movie);
        // Update the local storage value.
        return localStorageService.set('bookmarks', movies);
    },

    /**
     * Get all of the movies from the local storage "movies" array.
     * On success return the value from the local storage.
     *
     * @returns bool
     */
    getMovies: function() {
      return localStorageService.get('bookmarks');
    },

    /**
     * Check if a movie is bookmarked.
     * On success return the true else return false.
     *
     * @param movie
     *  The movie object {*}.
     *
     * @returns bool
     */
    isMovieBookmarked: function() {
      return true;
    }
   }

  }]);
