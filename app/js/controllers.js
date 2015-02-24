define(['angular', 'services'], function (angular) {
  'use strict';
  return angular.module('myApp.controllers', ['myApp.services'])
    .controller('HomeCtrl', ['$scope', '$injector', function ($scope, $injector) {
      require(['../feature/home/homeController'], function (controller) {
        $injector.invoke(controller, this, {'$scope': $scope});
      });
    }]);
});