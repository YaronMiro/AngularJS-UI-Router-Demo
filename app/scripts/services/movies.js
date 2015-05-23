'use strict';

angular.module('myApp')
  .factory('Movies', ['$http', '$q', '$sce', 'Bookmarks', function ($http, $q, $sce, Bookmarks) {

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
          // Get the top 30 movies IDs.
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

          angular.forEach(movies.results, function(movie, index) {

            // Adding unique id for each movie.
            movie.id = ids[index];

            // Flag to identify if the movie is bookmarked.
            movie.isBookmarked = Bookmarks.isMovieBookmarked(movie.id);

            // Adding a flag to the movie object to reference it's relationship
            // to the bookmark type movie.
            movie.originBookmark = 0;

            // Adding index for each movie.
            movie.index = index + 1;

            // Ad an extra movie image size 600px width.
            movie.artworkUrl600 = movie.artworkUrl100.replace('100x100', "600x600");

            // pretty url - we will replace it with a cleaner structure.
            // (e.g) movie-info/movie%20name/1 => movie-info/movie-name/1.
            movie.urlAlias = movie.trackName.replace(/ /g, '-').toLowerCase();
          });

          deferred.resolve(movies.results);
        })
      // Return promise object.
      return deferred.promise;
    }

    // Public API here
    return {

      /**
       *
       * @param movies
       *  Movies array.
       * @returns {*}
       *  AN array of genres names and counter for each genre.
       */
      getMoviesGenres: function(movies) {
        var genres = {};
        angular.forEach(movies, function(movie) {
          angular.isDefined(genres[movie.primaryGenreName]) ? genres[movie.primaryGenreName]++ : genres[movie.primaryGenreName] = 1;
        });
        console.log(genres)
        return genres;
      },

      /**
       * Return a promise object of the list of Movies.
       *
       * @returns {*}
       */
      gettingMovies: function(moviesCount) {
        var deferred = $q.defer();
        var self = this;

        moviesCount = angular.isDefined(moviesCount) ? moviesCount : 60;

        // Get the top movies ids.
        requestTopMoviesIds(moviesCount).then(function(moviesIds) {
          requestMoviesById(moviesIds).then(function(movies) {
            var data = {};
            data.movies = movies
            data.genres = self.getMoviesGenres(movies);
            deferred.resolve(data);
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
        }, params);

        // Joining the params.
        params = '&' + params.join('&');
        // Making sure the url is valid and trusted.
        return $sce.trustAsResourceUrl(encodeURI(movieData.basePath + movieName + ' ' + 'trailer' + params))
      }
    };
  }]);
