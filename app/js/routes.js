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
      .state('appInfo', {
          url: '/appInfo',
          templateUrl: 'feature/appInfo/appSelector.html',
          controller: 'appSelectorController'
      })
      .state('appInfo.detail', {
          url: '/:appId',
          views: {
              '': {
                  templateUrl: 'feature/appInfo/appDetail.html',
                  controller: 'appDetailController'
              }
          }
      })
      .state('graph', {
          url: '/graph',
          templateUrl: 'feature/dependencyGraph/forcedGraphView.html',
          controller: 'forcedGraphCtrl'
          //reloadOnSearch: false
      })
      .state('graphWithAppName', {
          url: '/graph/:app_name?down&up&hops&nodes&exclude&include',
          templateUrl: 'feature/dependencyGraph/forcedGraphView.html',
          controller: 'forcedGraphCtrl'
      })
      .state('janus', {
          url: '/janus',
          templateUrl: 'feature/janus/maintenanceEventsView.html',
          controller: 'maintenanceEventsCtrl'
      })
      .state('changeEvents', {
          url: '/janus/buildHistory',
          templateUrl: 'feature/janus/changeEventsView.html',
          controller: 'changeEventsCtrl'
      })
      .state('about', {url: '/about', templateUrl: 'feature/about/aboutView.html'})
      .state('contact', {url: '/contact', templateUrl: 'feature/contact/contactView.html'});
  }]);
});
