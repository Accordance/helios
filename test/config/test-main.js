// needed for RequireJS
// see http://karma-runner.github.io/0.10/plus/requirejs.html for details

var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            // custom check to get rid of lib test files
            if (file.indexOf("/base/test/unit") !== -1) {
                tests.push(file);
            }
        }
    }
}

requirejs.config({
    // need under /base here because Karma serves files there
    baseUrl: "/base/app/js",
    paths: {
        jquery: '../lib/jquery/dist/jquery.min',
        d3: '../lib/d3/d3',
        bootstrap: '../lib/bootstrap/dist/js/bootstrap',
        angular: '../lib/angular/angular',
        'angular-resource': '../lib/angular-resource/angular-resource',
        'angular-ui-router': '../lib/angular-ui-router/release/angular-ui-router',
        'angular-bootstrap': '../lib/angular-bootstrap/ui-bootstrap-tpls',
        'angular-mocks': '../lib/angular-mocks/angular-mocks',
        'ng-table': '../lib/ng-table/ng-table',
        lodash: '../lib/lodash/dist/lodash',
        moment: '../lib/momentjs/moment',
        fed: [ '//static.ctctcdn.com/h/fed-framework/0.0.21/fed.min.js' ],
        vis: '../lib/vis/dist/vis'
    },
    shim: {
        d3: {
            exports: 'd3'
        },
        bootstrap: {
            deps: ['jquery']
        },
        angular : {
            exports : 'angular'
        },
        angularMocks: {
            deps:['angular'],
            exports:'angular.mock'
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'angular-bootstrap': {
            deps: ['angular']
        },
        'angular-mocks': {
            deps: ['angular'],
            exports: 'angular.mock'
        },
        'ng-table': {
            deps: ['angular']
        },
        'lodash': {
            exports: '_'
        },
        vis: {
            exports: 'vis'
        }
    },
    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});