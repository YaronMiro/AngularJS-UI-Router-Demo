'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('MovieCtrl', ['$scope','$stateParams', '$state', 'selectedMovie', function ($scope, $stateParams, $state, selectedMovie) {

    // Selected movie.
    $scope.selectedMovie = selectedMovie;
    var movieParams = $state.current.data;
    console.log(movieParams);
  }]);
