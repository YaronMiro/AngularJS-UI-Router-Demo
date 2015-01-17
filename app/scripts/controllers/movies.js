'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('MoviesCtrl', ['$scope', '$state', 'Movies', function ($scope, $state, Movies) {

    Movies.gettingMovies(30).then(function(movies){
      $scope.movies = movies;
    });

  }]);
