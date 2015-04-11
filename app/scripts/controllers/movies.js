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

    self.addToBookmarks = function(movie) {
      Bookmarks.addToBookmarks(movie);
      console.log(Bookmarks.getMovies());
    }

  }]);
