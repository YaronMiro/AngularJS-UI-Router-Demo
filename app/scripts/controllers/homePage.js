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

    Movies.gettingMovies(25).then(function(movies){
      console.log(movies, 'dsdad');
      $scope.movies = movies;
    });

    $scope.menus = ['home','about'];
  }]);
