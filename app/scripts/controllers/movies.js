'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('moviesController', ['moviesData','Bookmarks','Movies', function (moviesData, Bookmarks, Movies) {

    var self = this;

    // Movies data.
    self.data = moviesData.movies;

    // Movies data.
    self.filterByGenre = '!All';

    // Movies genres.
    self.genres = moviesData.genres;

    // Bookmarks service object.
    self.bookmarksService = Bookmarks;

    /**
     * Filter by movie genre.
     *
     * @param genreName
     *  The genre name.
     */
    self.filterByMovieGenre = function(genreName) {
      self.filterByGenre = genreName === 'All' ? '!All' : genreName;
    }
  }]);
