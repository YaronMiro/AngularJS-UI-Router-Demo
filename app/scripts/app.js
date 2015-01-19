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
        onEnter: function($state, $stateParams) {
          // pretty url (e.g) movie%20name => movie-name
          var cleanParam = $stateParams.name.replace(/ /g, '-').toLowerCase();
          $stateParams.name = cleanParam;

          // Redirect to "movies" view in case of an invalid url.
          if ($stateParams.position == -1) {
            $state.go('main.movies');
          }
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
       })
  }]);
