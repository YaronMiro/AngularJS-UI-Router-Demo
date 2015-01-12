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

    Movies.gettingMovies(2).then(function(movies){
      $scope.movies = movies;
    });

    $scope.menus = ['home','about'];
  }]);
