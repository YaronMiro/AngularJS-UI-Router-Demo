'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('HomePageCtrl', ['$scope', function ($scope) {
    $scope.menus = ['home','about'];
  }]);
