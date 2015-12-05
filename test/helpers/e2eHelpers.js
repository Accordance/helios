var expectNoConsoleErrors = function () {
  "use strict";
  browser.manage().logs().get('browser').then(function (browserLog) {
    expect(browserLog.length).toEqual(0);
  });
};

module.exports.expectNoConsoleErrors = expectNoConsoleErrors;