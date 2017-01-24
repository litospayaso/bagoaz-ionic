// Ionic Starter App

angular.module('starter', ['ionic', 'starter.controllers', 'ionic-toast'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.Laguntza', {
        url: '/Laguntza',
        views: {
          'menuContent': {
            templateUrl: 'components/bagoaz-about/bagoaz-about.html'
          }
        }
      })

      .state('app.Gaiak', {
        url: '/Gaiak',
        views: {
          'menuContent': {
            templateUrl: 'components/bagoaz-gaiak/bagoaz-gaiak.html'
          }
        }
      })
      .state('app.Ariketak', {
        url: '/Ariketak',
        views: {
          'menuContent': {
            templateUrl: 'components/bagoaz-ariketak/bagoaz-ariketak.html'
          }
        }
      })
      .state('app.Bilatzaile', {
        url: '/Bilatzaile',
        views: {
          'menuContent': {
            templateUrl: 'components/bagoaz-bilatzaile/bagoaz-bilatzaile.html'
          }
        }
      })
      .state('app.Hiztegiak', {
        url: '/Hiztegiak',
        views: {
          'menuContent': {
            templateUrl: 'components/bagoaz-hiztegiak/bagoaz-hiztegiak.html'
          }
        }
      })

      .state('app.Gaia', {
        url: '/Ikusi/:tipo/:numero',
        views: {
          'menuContent': {
            templateUrl: 'components/bagoaz-ikusi/bagoaz-ikusi.html'
          }
        }
      })

      .state('app.Ariketa', {
        url: '/Baloratzea/:gaiak',
        views: {
          'menuContent': {
            templateUrl: 'components/bagoaz-baloratzea/bagoaz-baloratzea.html'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/Gaiak');
  });

angular.module("starter")
  .controller("indexController", ["$rootScope", "$scope", "$location", "$http", "ionicToast", function ($rootScope, $scope, $location, $http, ionicToast) {
    "use strict";

    $scope.moveScreen = function (targetScreen) {
      $location.path(targetScreen);
    };

    $http({
      method: 'GET',
      url: 'https://raw.githubusercontent.com/litospayaso/bagoaz-ionic/master/www/database/bagoaz-export.json'
    }).then(function successCallback(data) {
      $rootScope.gaiak = data.data.gaiak;
      $rootScope.ariketak = data.data.ariketak;
      // $rootScope.lexiko = data.data.lexiko;
      localStorage.setItem("databaseCookie", JSON.stringify(data));
    }, function errorCallback(response) { //Error case not connection available
      ionicToast.show('Conexión a internet no detectada. Habilite su conexión para un correcto uso de la aplicación', 'bottom',false, 5000);
      if (JSON.parse(localStorage.getItem("databaseCookie")) != null){
        var databaseCookie = [];
        databaseCookie = JSON.parse(localStorage.getItem("databaseCookie"));
        $rootScope.gaiak = databaseCookie.data.gaiak;
        $rootScope.ariketak = databaseCookie.data.ariketak;
        // $rootScope.lexiko = databaseCookie.data.lexiko;
      }else{
        ionicToast.show('Conexión a internet no detectada. Habilite su conexión para un correcto uso de la aplicación', 'bottom',false, 5000);
        $http.get('database/bagoaz-export.json').success(function (data) {
          $rootScope.gaiak = data.gaiak;
          $rootScope.ariketak = data.ariketak;
          // $rootScope.lexiko = data.lexiko;
        });
      }
    });

    $scope.colorButton = function (index){
      var cookie = [];
      if (JSON.parse(localStorage.getItem("cookie")) != null){
        cookie = JSON.parse(localStorage.getItem("cookie"));
      }
      if (cookie.indexOf(index) > -1){
        return "button button-block button-stable"
      }else{
        return "button button-block button-positive"
      }
    };
  }]);

