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
.module('myApp', [
    'ui.router',
    'ngAnimate',
    'config',
    'angular-loading-bar',
    'LocalStorageModule',
  ])
  .config(['$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider', function($stateProvider, $urlRouterProvider, cfpLoadingBarProvider){

    // Default url route.
    $urlRouterProvider.otherwise('/movies');

    $stateProvider
      // The main view.
      .state('main',{
        url: '/',
        abstract: true,
        views: {
          // Absolutely targets the 'header' view in this state.
          // <div ui-view="header"/> within index.html
          'header': {
            templateUrl: 'views/main/header.html'
          },
          // Absolutely targets the 'footer' view in this state.
          // <div ui-view="footer"/> within index.html
          'footer': {
            templateUrl: 'views/main/footer.html'
          }
        }
       })

      // Movies.
      .state('main.movies',{
        url: 'movies',
        views: {
          // Relatively targets the 'content' view in this state parent state, 'main'.
          // <div ui-view='content'/> within index.html
          'content@': {
            templateUrl: 'views/pages/movies/movies.html',
            controller: 'MoviesCtrl'
          },
          // Absolutely targets the 'preview' view in this state.
          // <div ui-view="preview"/> within movies.html
          'preview@main.movies': {
            templateUrl: 'views/pages/movies/movie.preview.html'
          },
          // Absolutely targets the 'summary' view in this state.
          // <div ui-view="summary"/> within movies.html
          'summary@main.movies': {
            templateUrl: 'views/pages/movies/movie.summary.html'
          }
        }
       })

      // Movie full.
      .state('main.movies.full',{
        url: '^/movie-details/:name',
        params: {name: 'default', position: -1},
        views: {
          'content@': {
            templateUrl: 'views/pages/movies/movie.full.html',
            controller: 'MoviesCtrl'
          }
        },
//        resolve: function() {
//
//
//        },
        onEnter: function($state, $stateParams) {
          // pretty url (e.g) movie%20name => movie-name
          var cleanParam = $stateParams.name.replace(/ /g, '-').toLowerCase();
          $stateParams.name = cleanParam;
        }
       })

      // My movies.
      .state('main.myMovies',{
        url: 'my-movies',
        views: {
          'content@': {
            templateUrl: 'views/pages/about.html'
          }
        }
       });

      // Configuration of the loading bar.
      //cfpLoadingBarProvider.includeSpinner = false;
      //cfpLoadingBarProvider.latencyThreshold = 1000;

  }])
  .run([ '$rootScope', '$state', '$stateParams', '$log', 'Config', function ($rootScope, $state, $stateParams, $log, Config) {
    // It's very handy to add references to $state and $stateParams to the
    // $rootScope so that you can access them from any scope within your
    // applications.For example:
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decedents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    return;

    if (!!Config.debugUiRouter) {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $log.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
      });

      $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams) {
        $log.log('$stateChangeError - fired when an error occurs during transition.');
        $log.log(arguments);
      });

      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $log.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
      });

      $rootScope.$on('$viewContentLoaded', function (event) {
        $log.log('$viewContentLoaded - fired after dom rendered', event);
      });

      $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        $log.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
        $log.log(unfoundState, fromState, fromParams);
      });
    }
  }]);
