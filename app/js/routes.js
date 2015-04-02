/*jshint -W055 */
define(['angular', 'app', 'lodash'], function (angular, app, lodash) {
  'use strict';

  return app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'feature/home/homeView.html',
        controller: 'HomeCtrl'
      })
      .state('about', {url: '/about', templateUrl: 'feature/about/aboutView.html'})
      .state('contact', {url: '/contact', templateUrl: 'feature/contact/contactView.html'});
  }]);
});