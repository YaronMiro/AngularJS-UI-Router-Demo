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
    self.data = moviesData.movies;

    // Movies genres.
    self.genres = moviesData.genres;
    self.genres = {
      'Action & Adventure': 17,
      'Comedy': 8,
      'Documentary': 1,
      'Drama': 14,
      'Kids & Family': 8,
      'Musicals': 2,
      'Romance': 2,
      'Sci-Fi & Fantasy': 2,
      'Thriller': 5,
      'Western': 1
    }

    // Bookmarks service object.
    self.bookmarksService = Bookmarks;

  }]);
