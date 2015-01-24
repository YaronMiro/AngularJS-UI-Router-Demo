'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('MoviesCtrl', ['$scope','$stateParams', 'movies', function ($scope, $stateParams, movies) {

      // Movies data.
      $scope.movies = movies;

  }]);
