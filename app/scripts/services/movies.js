'use strict';

angular.module('myApp')
  .factory('Movies', function ($http, $q) {

    /**
    * Return the promise of the list of movies resolved in from cache of the server.
    *
    * @returns {*}
    */
    function requestMovies() {
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: 'https://itunes.apple.com/us/rss/topmovies/limit=25/json'
      })
      .success(function(data) {
          var moviesList = data.feed.entry;
          var movies = [];
          console.log('Success: ', moviesList);
          deferred.resolve(moviesList);
      })
      .error(function(data) {
        console.log('Error: ', data);
        deferred.reject(data);
      });
      // Return promise object.
      return deferred.promise;
    }

    // Public API here
    return {
      /**
       * Return a promise object of the list of Movies.
       *
       * @returns {*}
       */
      gettingMovies: function () {
        return requestMovies();
      }
    };
  });
