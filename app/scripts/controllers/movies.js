'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('moviesController', ['moviesData','Bookmarks', '$document', function (moviesData, Bookmarks, $document) {

    var self = this;

    // Movies data.
    self.data = moviesData;

    // Bookmarks service object.
    self.bookmarksService = Bookmarks;

  }]);
