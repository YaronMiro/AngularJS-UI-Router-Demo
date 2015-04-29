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
    'duScroll'
  ])
  .config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', function($stateProvider, $urlRouterProvider, localStorageServiceProvider){

    // Setting a local storage "prefix" to avoid overwriting another data.
    // on the local storage.
    localStorageServiceProvider.setPrefix('myApp');

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
     * @param moviesData
     *   Array of movie {*}.
     * @param $stateParams
     *   The state url params {*}.
     * @param $filter
     *  The $filter service {*}.
     *
     *  Return the target movie {*}.
     */
    var gettingSelectedMovie = function(moviesData, $stateParams, $filter){
      var selectedMovie = $filter('filter')(moviesData, {urlAlias: $stateParams.name});
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
          moviesData: function(Movies){
            return Movies.gettingMovies();
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
          moviesData: function(Bookmarks){
            return Bookmarks.getMovies();
          }
        }
       })

      // Movies state.
      .state('main.movie',{
        url: 'movie/{name}?originBookmark',
        abstract: true,
        resolve: {
          moviesData: function(Movies, Bookmarks, $stateParams){
            // Set the data type according to the movie origin.
            return (parseInt($stateParams.originBookmark)) ? Bookmarks.getMovies(): Movies.gettingMovies();
          }
        },
        data: {
          trailer: {
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

      // Single movie state.
      .state('main.movie.movieInfo',{
        // The "^" character excludes the parent prefix url
        // ("movie/{name}?originBookmark") format from this child state url, it
        // will become only as "movie/info/{name}?originBookmark".
        url: '^/movie/info/{name}?originBookmark',
        views: {
          'content@': {
            templateUrl: 'views/pages/movie/movieInfo.html',
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
          breadcrumbs: 'info'
        }
      })

      // Single movie state.
      .state('main.movie.trailer',{
        // The "^" character excludes the parent prefix url
        // ("movie/{name}?originBookmark") format from this child state url, it
        // will become only as "movie/trailer/{name}?originBookmark".
        url: '^/movie/trailer/{name}?originBookmark',
        views: {
          'content@': {
            templateUrl: 'views/pages/movie/trailer.html',
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
          breadcrumbs: 'trailer'
        }
      })
  }])
  .run([ '$rootScope', '$state', '$stateParams', 'localStorageService', function ($rootScope, $state, $stateParams, localStorageService) {
    // It's very handy to add references to $state and $stateParams to the
    // $rootScope so that you can access them from any scope within your
    // applications.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.parseInt = parseInt;

    // Helper to debug on template file.
    $rootScope.console = function(data) {
      return console.log(data);
    };

    //Debug variable
    $rootScope.debug = false;

    // Access local storage service from any scope.
    $rootScope.localStorageService = localStorageService;
  }])
