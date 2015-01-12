'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('HomePageCtrl', ['$scope', 'Movies', function ($scope, Movies) {

    $scope.movies = Movies.gettingMovies();
    $scope.menus = ['home','about'];
  }]);
