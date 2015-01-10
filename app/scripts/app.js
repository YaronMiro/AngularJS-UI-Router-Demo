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

    $stateProvider
      // The main view.
      .state('main',{
        url: '/',
        abstract: true,
        views: {
          'header': {
            templateUrl: '/views/main/header.html'
          },
          'content': {
            templateUrl: '/views/main/main.html'
          },
          'footer': {
            templateUrl: '/views/main/footer.html'
          }
        },
        onEnter: function(){
          console.log("enter main");
        }
       })

      // Home.
      .state('main.home',{
        url: 'home',
        views: {
          'content@': {
            templateUrl: '/views/pages/home.html'
          }
        },
        onEnter: function(){
          console.log("enter home page");
        }
       })

      // About.
      .state('main.about',{
        url: 'about',
        views: {
          'content@': {
            templateUrl: '/views/pages/about.html'
          }
        },
        onEnter: function(){
          console.log("enter about page");
        }
       })
  }]);
