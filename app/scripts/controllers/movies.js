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

    //self.scrollToSelf = function(id, offset) {
    //  offset = angular.isDefined(offset) ? offset: 90;
    //  var element = angular.element(document.getElementById(id));
    //  $document.scrollToElementAnimated(element, offset)
    //  console.log(offset);
    //}

    // Bookmarks service object.
    self.bookmarksService = Bookmarks;

  }]);
