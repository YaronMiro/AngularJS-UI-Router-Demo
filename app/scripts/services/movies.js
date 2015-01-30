'use strict';

angular.module('myApp')
  .factory('Movies', ['$http', '$q', '$sce', function ($http, $q, $sce) {

    /**
     * Return the promise {*} with the list of top movies Ids amount by moviesCount.
     *
     * @param moviesCount
     *  Number of movies to return.
     *
     * @returns {*}
     */
    function requestTopMoviesIds(moviesCount) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'https://itunes.apple.com/us/rss/topmovies/limit=' + moviesCount + '/json'
      })
      .success(function(data) {
          var moviesIds = [];
          // Get the top 25 movies IDs.
          angular.forEach(data.feed.entry, function(movie) {
            moviesIds.push(movie.id.attributes['im:id']);
          });
          deferred.resolve(moviesIds);
      })

      // Return promise object.
      return deferred.promise;
    }

    /**
     * Return the promise {*} with the list of top movies data.
     *
     * @param ids
     *  An array of movies IDs.
     *
     * @returns {*}
     */
    function requestMoviesById(ids) {

      // Exit early if it's not an array.
      if (!angular.isArray(ids)) {
        return;
      }
      var deferred = $q.defer();
      $http.jsonp('https://itunes.apple.com/lookup', {params: { id: ids.join(), callback: 'JSON_CALLBACK'}})
        .success(function(movies) {
          // Ad an extra movie image sizes 300px | 600px width.
          angular.forEach(movies.results, function(movie) {
            var artworkUrl600 = movie.artworkUrl100.replace('100x100', "600x600");
            movie.artworkUrl600 = artworkUrl600;
          });

          deferred.resolve(movies.results);
        })
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
      gettingMovies: function(moviesCount) {
        var deferred = $q.defer();

        // Get the top movies ids.
        requestTopMoviesIds(moviesCount).then(function(moviesIds) {
          requestMoviesById(moviesIds).then(function(movies) {
            deferred.resolve(movies);
          })
        });

        // Return promise object.
        return deferred.promise;
      },

      /**
       * Generates "youtube" movie trailer url.
       *
       * @param movieName
       *  The search query.
       * @param movieData
       *  The movie data (config data).
       *
       * @returns {string}
       */

      gettingMovieTrailerUrl: function(movieName, movieData) {

        // Prepare the query string with the movie params.
        var params = [];
        angular.forEach(movieData.params, function(value, param){
          this.push(param + '=' + value);
        },params);

        // Join the params.
        params = '&' + params.join('&');
        // create the search query
        var searchQuery = movieName + ' trailer';
        // Making sure the url is valid
        return  $sce.trustAsResourceUrl(encodeURI('http://www.youtube.com/embed/?listType=search&list=' + searchQuery + params))
      }
    };
  }]);
