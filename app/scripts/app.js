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
    'LocalStorageModule'
  ])
  .config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', function($stateProvider, $urlRouterProvider, localStorageServiceProvider){

    // Setting a local storage "prefix" to avoid overwriting another data.
    // on the local storage.
    localStorageServiceProvider.setPrefix('myApp')

    /**
     * Redirect a user to homepage.
     *
     * @param $state
     *   The ui-router state.
     * @param $selectedMovie
     *   The target movie.
     */
    var redirect = function($state, selectedMovie) {

      if (!angular.isDefined(selectedMovie)) {
        // if the movie doesn't exist then redirect to the "parent" state.
        // in our case it's the main "movies" state.
        $state.go('main.movies');
      }
    };

    /**
     * Redirect a user to homepage.
     *
     * @param movies
     *   Array of movie {*}.
     * @param $stateParams
     *   The state url params {*}.
     * @param $filter
     *  The $filter service {*}.
     *
     *  Return the target movie {*}.
     */
    var gettingSelectedMovie = function(movies, $stateParams, $filter){
      var selectedMovie = $filter('filter')(movies, {urlAlias: $stateParams.name});
      return selectedMovie[0];
    };

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
            controller: 'moviesController',
            controllerAs: 'movies'
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

      // Bookmarks Movies state.
      .state('main.bookmarks',{
        url: 'bookmarks',
        views: {
          // Relatively targets the 'content' view in this state parent state,
          // 'main'. <div ui-view='content'/> within index.html.
          'content@': {
            templateUrl: 'views/pages/movies/movies.html',
            controller: 'moviesController',
            controllerAs: 'movies'
          },
          // Absolutely targets the 'preview' view in this state.
          // <div ui-view="preview"/> within movies.html.
          'preview@main.bookmarks': {
            templateUrl: 'views/pages/movies/movie.preview.html'
          },
          // Absolutely targets the 'summary' view in this state.
          // <div ui-view="summary"/> within movies.html.
          'summary@main.bookmarks': {
            templateUrl: 'views/pages/movies/movie.summary.html'
          }
        },
        resolve: {
          movies: function(Bookmarks){
            return Bookmarks.getMovies();
          }
        }
       })


      // Movies state.
      .state('main.movie',{
        url: 'movie/{name}',
        abstract: true,
        resolve: {
          // Example showing injection of service into resolve function.
          // Service then returns a promise.
          movies: function(Movies, Bookmarks, $state, $stateParams){
            console.log($stateParams);
            return Movies.gettingMovies(30);
          }
        }
      })


      // Single movie state.
      .state('main.movie.movieInfo',{
        url: '/info/{name}?',
        views: {
          'content@': {
            templateUrl: 'views/pages/movieInfo.html',
            controller: 'movieController',
            controllerAs: 'movie'
          }
        },
        resolve: {
          // Example showing injection of a "parent" resolve object
          // into it's child resolve function.
          selectedMovie: gettingSelectedMovie
        },
        onEnter: redirect
      })

      // Single movie state.
      .state('main.movie.trailer',{
        url: '/trailer/{name}',
        views: {
          'content@': {
            templateUrl: 'views/pages/trailer.html',
            controller: 'movieController',
            controllerAs: 'movie'
          }
        },
        resolve: {
          // Example showing injection of a "parent" resolve object
          // into it's child resolve function.
          selectedMovie: gettingSelectedMovie
        },
        onEnter: redirect,
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
  .run([ '$rootScope', '$state', '$stateParams', 'localStorageService', '$log', function ($rootScope, $state, $stateParams, localStorageService, $log) {
    // It's very handy to add references to $state and $stateParams to the
    // $rootScope so that you can access them from any scope within your
    // applications.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // Access local storage service from any scope.
    $rootScope.localStorageService = localStorageService;

//    if (localStorageService.isSupported) {
//      console.log('Support ', localStorageService.getStorageType());
//    }
//    else {
//      console.log('No support!', localStorageService.getStorageType());
//    }

//
//      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
//        $log.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
//      });
//
//      $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams) {
//        $log.log('$stateChangeError - fired when an error occurs during transition.');
//        $log.log(arguments);
//      });
//
//      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
//        $log.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
//      });
//
//      $rootScope.$on('$viewContentLoaded', function (event) {
//        $log.log('$viewContentLoaded - fired after dom rendered', event);
//      });
//
//      $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
//        $log.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
//        $log.log(unfoundState, fromState, fromParams);
//      });

  }])
