'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('HomePageCtrl', ['$scope', '$state', 'Movies', function ($scope, $state, Movies) {

    $scope.flag = false;

    Movies.gettingMovies(30).then(function(movies){
      $scope.movies = movies;
    });

    $scope.toggleMovieMode = function() {
      $state.current.name == 'main.home' ?  $state.go('.movie') :  $state.go('main.home');
    }


  }]);
