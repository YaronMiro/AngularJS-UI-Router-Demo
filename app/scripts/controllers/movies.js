'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('MoviesCtrl', ['$scope','$stateParams', 'Movies', function ($scope, $stateParams, Movies) {

    Movies.gettingMovies(3).then(function(movies){
      $scope.movies = movies;
    });

  }]);
