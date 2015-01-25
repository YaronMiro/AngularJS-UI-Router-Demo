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

//      if(angular.isDefined(selectedMovie)) {
//        $scope.selectedMovie = $scope.movies[selectedMovie];
//      }
//    console.log($scope.selectedMovie)
//    console.log($stateParams)

  }]);
