"use strict";angular.module("myApp",["ui.router"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/home"),a.state("main",{url:"/","abstract":!0,views:{header:{templateUrl:"views/main/header.html"},footer:{templateUrl:"views/main/footer.html"}}}).state("main.home",{url:"home",views:{"content@":{templateUrl:"views/pages/home/home.html",controller:"HomePageCtrl"}}}).state("main.home.edit",{url:"/edit",templateUrl:"views/pages/home/home.edit.html",controller:"HomePageEditCtrl"}).state("main.about",{url:"about",views:{"content@":{templateUrl:"views/pages/about.html"}}})}]),angular.module("myApp").controller("HomePageCtrl",["$scope",function(a){a.menus=["home","about"]}]),angular.module("myApp").controller("HomePageEditCtrl",["$scope",function(){console.log("edit")}]);