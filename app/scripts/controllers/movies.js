'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('moviesController', ['$scope','$stateParams', '$state', 'movies','Bookmarks', function ($scope, $stateParams, $state, movies, Bookmarks) {
    var self = this;
    // Movies data.
    self.data = movies;

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
    }

    /**
     * Delete movie from the bookmarks list.
     * @param movie {*}
     */
    self.removeFromBookmarks = function(movie) {
      Bookmarks.removeFromBookmarks(movie).then(function(data){
        if (data.deleted) {
          movie.isBookmarked = false;
        }
      });;
    }

  }]);
