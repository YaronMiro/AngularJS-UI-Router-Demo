'use strict';

angular.module('myApp')
  .factory('Bookmarks', ['localStorageService', '$filter', '$q', function (localStorageService, $filter, $q) {

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

        // Adding a flag to the movie object to reference it's relationship
        // to the bookmark type movie.
        movie.originBookmark = true;

        // Set a new index for the incoming movie.
        movie.index = movies.length ? (movies.length + 1) : 1;

        // Add movie to the array.
        movies.push(movie);

        // Update the local storage value.
        localStorageService.set('bookmarks', movies);
      },

      /**
       * Remove a movie to the local storage  "movies" array.
       *
       * @param movie
       *  The target movie to exclude object {*}.
       *
       */
      removeFromBookmarks: function(movie) {

        // Get array of movies.
        var movies = localStorageService.get('bookmarks');

        // Find the target movie from with in the movies array.
        var targetMovie = $filter('filter')(movies, {id: movie.id});

        // Remove movie from array of movies by it's (index value - 1).
        movies.splice((targetMovie[0].index -1), 1);

        // Re-order movies index.
        angular.forEach(movies, function(movie, index) {
          movie.index = (index + 1);
        });

        // Update the local storage value.
        localStorageService.set('bookmarks', movies);
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
