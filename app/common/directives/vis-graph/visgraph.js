define(['angular','vis'], function (angular, vis) {
    'use strict';

    angular.module('myApp.visGraphDirective', [])
        .directive('visGraph', [function () {
            return {
                restrict: 'AE',
                scope: {
                    data: '=data',
                    options: '=options'
                },
                link: function (scope, element, attrs) {
                    var container = element[0],
                        buildGraph = function (scope) {
                            return new vis.Timeline(container, scope.data, scope.options);
                    };
                    scope.$watch('data', function (newval, oldval) {
                        if (!newval) {
                          return;
                        }
                        if (!oldval) {
                          buildGraph(scope);
                        }
                    }, true);
                }
            };
        }]);
});


