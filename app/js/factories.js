define(['angular', 'lodash'], function (angular, lodash) {
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
    .factory('utils', function () {
        return {
            findById: function findById(a, id) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i]._id === id) {
                      return a[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('credentialsFact', ['$window', '$rootScope', function ($window, $rootScope) {
        var factory = {};
        factory.getUsername = function () {
            return $window.sessionStorage.userName;
        };
        factory.login = function(data, status, headers, config) {
            $window.sessionStorage.token = data.token;

            var user = angular.fromJson($window.atob(data.token.split('.')[1]));
            $window.sessionStorage.userEmail = user.email;
            $window.sessionStorage.userId = user.userId;
            $window.sessionStorage.userName = user.name;
            $window.sessionStorage.userHas2factor = user.has2factor;
            $window.sessionStorage.userGroups = user.groups;
            $window.sessionStorage.userAdmin = user.admin;

            // Fire event - notify all about successful login
            $rootScope.$emit("LoginController.login");
            $rootScope.userName = user.name;
            $rootScope.userAdmin = user.admin;
        };
        factory.logout = function() {
            // Erase the token if the user fails to log in
            delete $window.sessionStorage.token;
            delete $window.sessionStorage.userEmail;
            delete $window.sessionStorage.userId;
            delete $window.sessionStorage.userName;
            delete $window.sessionStorage.userHas2factor;
            delete $window.sessionStorage.userGroups;
            delete $window.sessionStorage.userAdmin;

            // Fire event - notify all about logout
            delete $rootScope.userName;
            delete $rootScope.userAdmin;
            $rootScope.$emit("LoginController.logout");
        };
        factory.is_member_of_group = function(group) {
            return lodash.contains($window.sessionStorage.userGroups, group);
        };
        factory.is_admin = function() {
            return $rootScope.userAdmin;
        };
        return factory;
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
    .factory('teamsFactory', ['$http', function ($http, utils) {
        var path = '/teams';
        var teams = $http.get(path).then(function (resp) {
            return resp.data;
        });

        var factory = {};
        factory.all = function () {
            return teams;
        };
        factory.getAll = function () {
            return $http.get(path);
        };
        factory.get = function (id) {
            return teams.then(function () {
                return utils.findById(contacts, id);
            });
        };
        factory.update_members = function(update_data) {
            return $http.post(path + '/members', update_data);
        };
        return factory;
    }])
    .factory('maintenanceEventsFactory', ['$resource', function ($resource) {
        return $resource('/janus/maintenanceEvents');
    }])
    .factory('changeEventsFactory', ['$resource', function ($resource) {
        return $resource('/janus');
    }])
	.factory('dataCenterFactory', ['$http', function ($http) {
        var path = '/data_centers';
		var factory = {};
        factory.getDatacenters = function(){
		  return $http.get(path);   
		}; 
		factory.publishDatacenters = function(id, descr){
		  return    $http({
		    url:path,
		    method:"POST",
		    params:{"id":id, "descr":descr}
		  });
		};
		return factory; 
    }]);
});
