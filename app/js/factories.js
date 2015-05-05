define(['angular'], function (angular) {
  'use strict';

  angular.module('myApp.factories', ['ngResource'])
    .factory('authInterceptor', ['$rootScope', '$q', '$window', function ($rootScope, $q, $window) {
      return {
        request: function (config) {
          config.headers = config.headers || {};
          if ($window.sessionStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
          }
          return config;
        },
        response: function (response) {
          if (response.status === 401) {
            // handle the case where the user is not authenticated
            console.log("Not authenticated");
          }
          return response || $q.when(response);
        }
      };
    }])
    .factory('appsFactory', ['$resource', function ($resource) {
        var resource = $resource('/apps/:id', { id: '@appId'});

        var factory = {};
        factory.resource = resource;
        factory.get = function (appId) {
            return resource.get({id: appId});
        };
        factory.appNames = function (processor) {
            return $resource('/apps/names', {}, {
                getAll: { method: 'GET', isArray: true }
            }).getAll(processor);
        };

        return factory;
    }])
    .factory('maintenanceEventsFactory', ['$resource', function ($resource) {
        return $resource('/janus/maintenanceEvents');
    }])
    .factory('changeEventsFactory', ['$resource', function ($resource) {
        return $resource('/janus');
    }]);
});
