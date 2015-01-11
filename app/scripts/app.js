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
          // Absolutely targets the 'header' view in this state's.
          // <div ui-view='header'/> within index.html
          'header': {
            templateUrl: 'views/main/header.html'
          },
          // Absolutely targets the 'footer' view in this state's.
          // <div ui-view='footer'/> within index.html
          'footer': {
            templateUrl: 'views/main/footer.html'
          }
        }
       })

      // Home.
      .state('main.home',{
        url: 'home',
        views: {
          // Relatively targets the 'content' view in this state parent state, 'main'.
          // <div ui-view='content'/> within index.html
          'content@': {
            templateUrl: 'views/pages/home/home.html',
            controller: 'HomePageCtrl'
          }
        }
       })

      // Home edit.
      .state('main.home.edit',{
        // Relatively targets the unnamed view in this state parent state, 'main.home'.
        // <div ui-view/> within home.html
        url: '/edit',
        templateUrl: 'views/pages/home/home.edit.html',
        controller: 'HomePageEditCtrl'
       })

      // About.
      .state('main.about',{
        url: 'about',
        views: {
          'content@': {
            templateUrl: 'views/pages/about.html'
          }
        }
       })
  }]);
