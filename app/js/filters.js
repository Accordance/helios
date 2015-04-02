define(['angular', 'services'], function (angular, services) {
  'use strict';

  angular.module('myApp.filters', ['myApp.services'])
    .filter('interpolate', ['version', function (version) {
      return function (text) {
        return String(text).replace(/\%VERSION\%/mg, version);
      };
    }])
    .filter('valuePresent', function () {
      return function (data) {
        console.log("wwww");
        return data !== undefined;
      };
    })
    .filter('docLinkCheck', function () {
      return function (data, message, value) {
        return data !== undefined ? value : "Missing " + message;
      };
    })
    .filter('range', function () {
      return function (input, total) {
        total = parseInt(total);
        for (var i = 0; i < total; i++) {
          input.push(i);
        }
        return input;
      };
    });
});