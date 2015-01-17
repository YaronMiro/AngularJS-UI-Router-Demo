'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('MoviesCtrl', ['$scope', '$state', '$stateParams', 'Movies', function ($scope, $state, $stateParams, Movies) {

    $scope.$state = $state;
    $scope.$stateParams = $stateParams;

    Movies.gettingMovies(30).then(function(movies){
      $scope.movies = movies;
    });

  }]);
