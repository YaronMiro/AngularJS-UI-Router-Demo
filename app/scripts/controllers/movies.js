'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('moviesController', ['moviesData','Bookmarks', function (moviesData, Bookmarks) {

    var self = this;

    // Movies data.
    self.data = moviesData;

    /**
     * Add movie to the bookmarks list.
     * @param movie {*}
     */
    self.addToBookmarks = function(movie) {
      Bookmarks.addToBookmarks(movie).then(function(data){
        if (data.saved) {
          movie.isBookmarked = true;
        }
      });
    };

    /**
     * Delete movie from the bookmarks list.
     * @param movie {*}
     */
    self.removeFromBookmarks = function(movie) {
      Bookmarks.removeFromBookmarks(movie).then(function(data){

        // In case movie was deleted.
        if (data.deleted) {
          movie.isBookmarked = false;

          // if movie was removed from the bookmarks state.
          if (movie.originBookmark) {
            // Then update the bookmarks state movies.
            Bookmarks.getMovies().then(function(updatedMoviesData){
             self.data = updatedMoviesData;
            });
          }
        }
      });;
    };

  }]);
