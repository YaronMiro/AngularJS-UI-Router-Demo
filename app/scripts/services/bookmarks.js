'use strict';

angular.module('myApp')
  .factory('Bookmarks', ['localStorageService', '$filter', '$q', function (localStorageService, $filter, $q) {

    // Private data array of movies.
    var data = {
      movies: localStorageService.get('bookmarks') || new Array(),
      genres: new Array()
    }

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

        var deferred = $q.defer();

        // Create a deep
        var movieCopy = {};
        angular.copy(movie, movieCopy);

        // Get array of movies.
        var movies = data.movies;

        // Adding a flag to the movie object to reference it's relationship
        // to the bookmark type movie.
        movieCopy.originBookmark = 1;
        movieCopy.isBookmarked = true;

        // Set a new index for the incoming movie.
        movieCopy.index = movies.length ? (movies.length + 1) : 1;

        // Add movie to the data object.
        movies.push(movieCopy);

        // Update the local storage value.
        var save = localStorageService.set('bookmarks', movies);

        // In case of success.
        if (save) {
          // On success mark the movie as bookmarked.
          movie.isBookmarked = true;

          deferred.resolve({"saved": save, "error": false});
        }
        // In case of error.
        else {
          deferred.reject({"saved": save, "error": true});
        }

        // Return promise object.
        return deferred.promise;
      },

      /**
       * Get the movies genres.
       *

       *
       * @returns | array [string];
       */
      getMoviesGenres: function() {

        angular.forEach(data.movies, function(movie, index) {
          data.genres[movie.primaryGenreName] = 'name';
        });

        console.log('Generes: ', data.genres);

      },

      /**
       * Remove a movie to the local storage  "movies" array.
       *
       * @param movie
       *  The target movie to exclude object {*}.
       *
       */
      removeFromBookmarks: function(movie) {

        var deferred = $q.defer();

        // Get array of movies.
        var movies = data.movies;

        // Find the target movie from with in the movies array.
        var targetMovie = $filter('filter')(movies, {id: movie.id});

        // Remove movie from array of movies by it's (index value - 1).
        movies.splice((targetMovie[0].index -1), 1);

        // Re-order movies each movie index value.
        angular.forEach(movies, function(movie, index) {
          movie.index = (index + 1);
        });

        // Update the local storage value.
        var deleted = localStorageService.set('bookmarks', movies);

        // In case of success.
        if (deleted) {

          // On success un-mark the movie as bookmarked.
          movie.isBookmarked = false;

          deferred.resolve({"deleted": deleted, "error": false});
        }
        // In case of error.
        else {
          deferred.reject({"deleted": deleted, "error": true});
        }

        // Return promise object.
        return deferred.promise;
      },

      /**
       * Get all of the movies from the local storage "movies" array.
       * On success return the value from the local storage.
       *
       * @returns bool
       */
      getMovies: function() {
        var deferred = $q.defer();

        data.genres = this.getMoviesGenres();
        deferred.resolve(data);
        // Return promise object.
        return deferred.promise;
      },

    /**
     * Check if a movie is bookmarked.
     * if bookmarked then it returns true, else returns false.
     *
     * @param movieId
     *  The movie unique id.
     *
     * @returns bool
     */
    isMovieBookmarked: function(movieId) {
      var movies = data.movies;
      // Find the target movie from with in the movies array.
      var targetMovie = $filter('filter')(movies, {id: movieId});
      return targetMovie.length ? true : false;
    }
   }

  }]);
