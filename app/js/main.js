(function () {
  'use strict';

  require.config({
    baseUrl: "js",
    paths: {
      jquery: '@@jquery',
      d3: '@@d3',
      bootstrap: '@@bootstrap',
      angular: '@@angular',
      'angular-resource': '@@angularResource',
      'angular-ui-router': '@@angularUiRouter',
      'angular-bootstrap': '@@angularBootstrap',
      'angular-mocks': '@@angularMocks',
      'angular-sanitize': '@@angularSanitize',
      'ng-table': '@@ngTable',
      lodash: '@@lodash',
      moment: '@@moment',
      vis: '@@vis'
    },
    shim: {
      d3: {
        exports: 'd3'
      },
      bootstrap: {
        deps: ['jquery']
      },
      angular: {
        exports: 'angular'
      },
      angularMocks: {
        deps: ['angular'],
        exports: 'angular.mock'
      },
      'angular-resource': {
        deps: ['angular']
      },
      'angular-ui-router': {
        deps: ['angular']
      },
      'angular-bootstrap': {
        deps: ['angular']
      },
      'angular-mocks': {
        deps: ['angular']
      },
      'angular-sanitize': {
        deps: ['angular']
      },
      'ng-table': {
        deps: ['angular']
      },
      'lodash': {
        exports: '_'
      },
      vis: {
        exports: 'vis'
      }
    },
    priority: [
      "angular"
    ],
    urlArgs: "@@requireQueryString"
  });

  require([
    '@@app',
    'angular',
    'angular-resource',
    'routes',
    'angular-bootstrap',
    'angular-sanitize',
    '@@possibleAngularMocks',
    'ng-table'
  ], function (app, angular) {
    angular.bootstrap(document, [app.name]);
  });
}());