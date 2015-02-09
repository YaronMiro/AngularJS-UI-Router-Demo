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
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    // Default url route.
    $urlRouterProvider.otherwise('/movies');

    $stateProvider
      // The main view.
      .state('main',{
        url: '/',
        abstract: true,
        views: {
          // Absolutely targets the 'header' view in this state.
          // <div ui-view="header"/> within index.html.
          'header': {
            templateUrl: 'views/main/header.html'
          },
          // Absolutely targets the 'footer' view in this state.
          // <div ui-view="footer"/> within index.html.
          'footer': {
            templateUrl: 'views/main/footer.html'
          }
        }
       })

      // Movies state.
      .state('main.movies',{
        url: 'movies',
        views: {
          // Relatively targets the 'content' view in this state parent state,
          // 'main'. <div ui-view='content'/> within index.html.
          'content@': {
            templateUrl: 'views/pages/movies/movies.html',
            controller: 'MoviesCtrl'
          },
          // Absolutely targets the 'preview' view in this state.
          // <div ui-view="preview"/> within movies.html.
          'preview@main.movies': {
            templateUrl: 'views/pages/movies/movie.preview.html'
          },
          // Absolutely targets the 'summary' view in this state.
          // <div ui-view="summary"/> within movies.html.
          'summary@main.movies': {
            templateUrl: 'views/pages/movies/movie.summary.html'
          }
        },
        resolve: {
          // Example showing injection of service into resolve function.
          // Service then returns a promise.
          movies: function(Movies){
            return Movies.gettingMovies(30);
          }
        }
       })

      // Single movie state.
      .state('main.movies.full',{
        // The "^" character excludes the parent prefix url format ("movies")
        // from this child state url, instead of "movies/movie-details/:name"
        // it will become "movie-details/:name".
        url: '^/movie-info/{name}/{position:int}',
        views: {
          'content@': {
            templateUrl: 'views/pages/movies/movie.full.html',
            controller: 'MovieCtrl'
          }
        },
        resolve: {
          // Example showing injection of a "parent" resolve object
          // into it's child resolve function.
          selectedMovie: function(movies, $stateParams){
            return movies[$stateParams.position];
          }
        },
        onEnter: function($stateParams, $state, selectedMovie) {

          // The logic for the redirect is done here and not on the
          // resolve function.
          if (!angular.isDefined(selectedMovie)) {
            // if the movie doesn't exist then redirect to the "parent" state.
            // in our case it's the main "movies" state.
            $state.go('^');
          }

          // pretty url - we will replace it with a cleaner structure.
          // (e.g) movie-info/movie%20name/1 => movie-info/movie-name/1.
          $stateParams.name = $stateParams.name.replace(/ /g, '-').toLowerCase();
        }
      })

      // Single movie state.
      .state('main.movies.trailer',{
        // The "^" character excludes the parent prefix url format ("movies")
        // from this child state url, instead of "movies/movie-details/:name"
        // it will become "movie-details/:name".
        url: '^/trailer/{name}/{position:int}',
        views: {
          'content@': {
            templateUrl: 'views/pages/movies/movie.trailer.html',
            controller: 'MovieCtrl'
          }
        },
        resolve: {
          // Example showing injection of a "parent" resolve object
          // into it's child resolve function.
          selectedMovie: function(movies, $stateParams){
            return movies[$stateParams.position];
          }
        },
        onEnter: function($stateParams, $state, selectedMovie) {

          // The logic for the redirect is done here and not on the
          // resolve function.
          if (!angular.isDefined(selectedMovie)) {
            // if the movie doesn't exist then redirect to the "parent" state.
            // in our case it's the main "movies" state.
            $state.go('^');
          }

          // pretty url - we will replace it with a cleaner structure.
          // (e.g) movie-info/movie%20name/1 => movie-info/movie-name/1.
          $stateParams.name = $stateParams.name.replace(/ /g, '-').toLowerCase();
        },
        data: {
          movie: {
            basePath: 'http://www.youtube.com/embed/?listType=search&list=',
            params: {
              controls: 2,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              autoplay: 1,
              hd: 1
            }
          }
        }
      })
  }])
  .run([ '$rootScope', '$state', '$stateParams', '$log', 'Config', function ($rootScope, $state, $stateParams, $log, Config) {
    // It's very handy to add references to $state and $stateParams to the
    // $rootScope so that you can access them from any scope within your
    // applications.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$stateParams = $stateParams;

  }])
  .filter('textReplace', function(){
    var self = this;
    return function(self){
      return self.replace(/-/g, ' ');
    };
  });
