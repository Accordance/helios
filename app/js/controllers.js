define(['angular', 'services'], function (angular) {
  'use strict';
  return angular.module('myApp.controllers', ['myApp.services'])
    .controller('HomeCtrl', ['$scope', '$injector', function ($scope, $injector) {
      require(['../feature/home/homeController'], function (controller) {
        $injector.invoke(controller, this, {'$scope': $scope});
      });
    }])
    .controller('appSelectorController', ['$scope', '$injector', function ($scope, $injector) {
      require(['../feature/appInfo/appSelectorController'], function (controller) {
        $injector.invoke(controller, this, {'$scope': $scope});
      });
    }])
    .controller('appDetailController', ['$scope', '$injector', function ($scope, $injector) {
      require(['../feature/appInfo/appDetailController'], function (controller) {
        $injector.invoke(controller, this, {'$scope': $scope});
      });
    }])
    .controller('forcedGraphCtrl', ['$scope', '$injector', function ($scope, $injector) {
      require(['../feature/dependencyGraph/forcedGraphController'], function (controller) {
        $injector.invoke(controller, this, {'$scope': $scope});
      });
    }])
    .controller('changeEventsCtrl', ['$scope', '$injector', function ($scope, $injector) {
      require(['../feature/janus/changeEventsController'], function (controller) {
        $injector.invoke(controller, this, {'$scope': $scope});
      });
    }])
    .controller('maintenanceEventsCtrl', ['$scope', '$injector', function ($scope, $injector) {
      require(['../feature/janus/maintenanceEventsController'], function (controller) {
        $injector.invoke(controller, this, {'$scope': $scope});
      });
    }])
	.controller('dataCenterControllers', ['$scope', '$injector', function ($scope, $injector) {
      require(['../feature/data_centers/dataCenterControllers'], function (controller) {
        $injector.invoke(controller, this, {'$scope': $scope});
      });
    }]);
});
