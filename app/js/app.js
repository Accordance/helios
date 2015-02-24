// Example came from - https://github.com/tnajdek/angular-requirejs-seed
// Dan Whilin - https://github.com/DanWahlin/CustomerManager
define([
	'angular',
	'filters',
	'services',
	'../common/directives/thumbnails/thumbnails',
    '../common/directives/vis-graph/visgraph',
	'controllers',
	'factories',
    // See README.MD for details about backend-less development with factoriesMocks
/**$'../temp/factoriesMocks',$**/
	'angular-ui-router'
	], function (angular, filters, services, thumbnailDirective, visGraphDirective, factories,/**$ factoriesMocks,$**/ controllers) {
		'use strict';

    var app = angular.module('myApp', [
            'myApp.controllers',
            'myApp.filters',
            'myApp.services',
            'myApp.thumbnailDirective',
            'myApp.visGraphDirective',
            'myApp.factories',
       /**$ 'myApp.factoriesMocks',$**/
            'ui.router',
            'ui.bootstrap',
            'ngSanitize',
            'ngTable'
        ],
        function ($locationProvider) {
            //$locationProvider.html5Mode(true);
            //$locationProvider.hashPrefix('!');
        });

  app.config(['$httpProvider', '$compileProvider', function ($httpProvider, $compileProvider) {
    $httpProvider.interceptors.push('authInterceptor');

    // This makes BLOB (and other file formats) treated as 'safe'
    //var oldWhiteList = $compileProvider.imgSrcSanitizationWhitelist();
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
  }]);

  app.run(['$rootScope', '$state', '$stateParams', '$window', function ($rootScope, $state, $stateParams, $window) {
		    $rootScope.$state = $state;
		    $rootScope.$stateParams = $stateParams;
        if ($window.sessionStorage.userName) {
            $rootScope.userName = $window.sessionStorage.userName;
        }
		}]);

  return app;
});