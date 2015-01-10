'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('HomeCtrl', ['$scope', function ($scope) {

    $scope.menus = ['home','about'];
    console.log($scope.menus);
  }]);
