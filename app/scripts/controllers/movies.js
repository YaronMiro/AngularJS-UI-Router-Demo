'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('moviesController', ['$scope','$stateParams', '$state', 'movies', '$document', function ($scope, $stateParams, $state, movies) {
    var self = this;
    // Movies data.
    self.data = movies;
  }]);
