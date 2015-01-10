'use strict';

/**
 * @ngdoc overview
 * @name myAppApp
 * @description
 * # myAppApp
 *
 * Main module of the application.
 */
angular
.module('myApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    // Default url route.
    $urlRouterProvider.otherwise('/home');
    $urlRouterProvider.when("", "/home");
    $urlRouterProvider.when("/", "/home");

    $stateProvider
      // The main view.
      .state('main',{
        url: '/',
        abstract: true,
        views: {
          'header': {
            templateUrl: '/views/main/header.html'
          },
          'footer': {
            templateUrl: '/views/main/footer.html',
            controller: 'HomeCtrl'
          }
        }
       })

      // Home.
      .state('main.home',{
        url: 'home',
        views: {
          'content@': {
            templateUrl: '/views/pages/home.html'
          }
        }
       })

      // About.
      .state('main.about',{
        url: 'about',
        views: {
          'content@': {
            templateUrl: '/views/pages/about.html'
          }
        }
       })
  }]);
