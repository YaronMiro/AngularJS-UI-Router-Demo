'use strict';

angular.module('myApp')
  .factory('Bookmarks', ['localStorageService', function (localStorageService) {

    // A private cache key.
    var movies = [];

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
      movies.push(movie);
      return localStorageService.set('bookmarks', movies);
    },

    /**
     * Get all of the movies from the local storage "movies" array.
     * On success return the value from the local storage.
     *
     *
     * @returns bool
     */
    getMovies: function() {
      return localStorageService.get('bookmarks');
    }

   }

  }]);
