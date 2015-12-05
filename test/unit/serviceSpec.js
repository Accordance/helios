define([
    'angular',
    'angular-mocks',
    'app'
], function(angular, mocks, app) {
    'use strict';

    describe('service', function() {
        beforeEach(mocks.module('myApp.services'));
        describe('version', function() {
            it('should return current version', mocks.inject(function(version) {
                expect(version).toEqual('0.1');
            }));
        });
    });
});