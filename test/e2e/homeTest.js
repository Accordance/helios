var helpers = require('../helpers/e2eHelpers.js');

describe('e2e: home', function () {
    "use strict";

    beforeEach(function () {
        browser.get('/');

    });

    afterEach(function () {
        helpers.expectNoConsoleErrors();
    });

    it('should load the home page', function () {
        expect(element(by.id('home_thumbnails')).isPresent()).toBe(true);
    });
});