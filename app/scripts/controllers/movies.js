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

    // Movies data.
    self.filterByGenre = '!All';

    // Movies genres.
    self.genres = moviesData.genres;

    // Bookmarks service object.
    self.bookmarksService = Bookmarks;

  }]);
