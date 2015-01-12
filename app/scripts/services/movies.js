'use strict';

angular.module('myApp')
  .factory('Movies', function ($http, $q) {

    /**
    * Return the promise of the list of top 25 movies Ids.
    *
    * @returns {*}
    */
    function requestTopMoviesIds() {
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: 'https://itunes.apple.com/us/rss/topmovies/limit=25/json'
      })
      .success(function(data) {
          var moviesList = data.feed.entry;
          var moviesIds = [];

          // GEt the top 25 movies IDs.
          angular.forEach(moviesList, function(movie) {
            moviesIds.push(movie.id.attributes['im:id']);
          });

          console.log('Movies: ', moviesList);
          console.log('Movie ids: ', moviesIds);
          deferred.resolve(moviesIds);
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
        return requestTopMoviesIds().then(function(data) {
          console.log('Public API', data)
        });
      }
    };
  });
