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
    }]);
});
