define(['angular'], function (angular) {
    'use strict';

    angular.module('myApp.thumbnailDirective', [])
        .directive('accThumbnails', [ function () {
            return {
                restrict: 'E',
                templateUrl: 'common/directives/thumbnails/thumbnails.html',
                replace: 'true',
                scope: {
                    groupName: '@',
                    thumbnailData: '='
                }
            };
        }]);
});