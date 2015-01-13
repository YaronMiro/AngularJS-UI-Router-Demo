"use strict";angular.module("myApp",["ui.router"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/home"),a.state("main",{url:"/","abstract":!0,views:{header:{templateUrl:"views/main/header.html"},footer:{templateUrl:"views/main/footer.html"}}}).state("main.home",{url:"home",views:{"content@":{templateUrl:"views/pages/home/home.html",controller:"HomePageCtrl"}}}).state("main.home.movie",{url:"/movie",templateUrl:"views/pages/home/home.movie.html",controller:"MovieCtrl"}).state("main.about",{url:"about",views:{"content@":{templateUrl:"views/pages/about.html"}}})}]),angular.module("myApp").controller("HomePageCtrl",["$scope","Movies",function(a,b){b.gettingMovies(30).then(function(b){a.movies=b}),a.clickMe=function(a){console.log(a)},a.flag=!1}]),angular.module("myApp").controller("MovieCtrl",["$scope",function(){console.log("edit")}]),angular.module("myApp").factory("Movies",["$http","$q",function(a,b){function c(c){var d=b.defer();return a({method:"GET",url:"https://itunes.apple.com/us/rss/topmovies/limit="+c+"/json"}).success(function(a){var b=[];angular.forEach(a.feed.entry,function(a){b.push(a.id.attributes["im:id"])}),d.resolve(b)}),d.promise}function d(c){if(angular.isArray(c)){var d=b.defer();return a.jsonp("https://itunes.apple.com/lookup",{params:{id:c.join(),callback:"JSON_CALLBACK"}}).success(function(a){angular.forEach(a.results,function(a){var b=a.artworkUrl100.replace("100x100","600x600");a.artworkUrl600=b}),d.resolve(a.results)}),d.promise}}return{gettingMovies:function(a){var e=b.defer();return c(a).then(function(a){d(a).then(function(a){e.resolve(a)})}),e.promise}}}]);