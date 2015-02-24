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
    }]);
});
