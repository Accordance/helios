/* jshint node: true */
'use strict';

var bower = require('./bower.json');

module.exports = {
  jsLibs: {
    src: {
      jquery: "/lib/jquery/dist/jquery",
      d3: "/lib/d3/d3",
      bootstrap: "/lib/bootstrap/dist/js/bootstrap",
      angular: "/lib/angular/angular",
      angularResource: "/lib/angular-resource/angular-resource",
      angularUiRouter: "/lib/angular-ui-router/release/angular-ui-router",
      angularBootstrap: "/lib/angular-bootstrap/ui-bootstrap-tpls",
      angularMocks: "/lib/angular-mocks/angular-mocks",
      angularSanitize: "/lib/angular-sanitize/angular-sanitize",
      ngTable: "/lib/ng-table/ng-table",
      lodash: "/lib/lodash/dist/lodash",
      moment: "/lib/momentjs/moment",
      vis: "/lib/vis/dist/vis",
      possibleAngularMocks: "angular-mocks",
      app: "app"
    },
    release: {
      jquery: "//ajax.googleapis.com/ajax/libs/jquery/" + bower.dependencies.jquery + "/jquery.min",
      d3: "../lib/d3/d3.min",
      bootstrap: "../lib/bootstrap/dist/js/bootstrap.min",
      angular: "../lib/angular/angular.min",
      angularResource: "../lib/angular-resource/angular-resource.min",
      angularUiRouter: "../lib/angular-ui-router/release/angular-ui-router.min",
      angularBootstrap: "../lib/angular-bootstrap/ui-bootstrap-tpls.min",
      angularMocks: "../lib/angular-mocks/angular-mocks",
      angularSanitize: "../lib/angular-sanitize/angular-sanitize.min",
      ngTable: "../lib/ng-table/ng-table.min",
      lodash: "../lib/lodash/dist/lodash.min",
      moment: "../lib/momentjs/min/moment.min",
      vis: "../lib/vis/dist/vis.min",
      possibleAngularMocks: "",
      app: "app"
    }
  },

  useMinHtml: [
    "index.html",
    "simple.html"
  ],

  projectVersionFiles: [
    "package.json",
    "bower.json"
  ]
};