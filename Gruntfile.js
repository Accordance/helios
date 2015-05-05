module.exports = function (grunt) {
  'use strict';

  var _ = require('lodash');

  // loads all grunt tasks from package.json
  require('load-grunt-tasks')(grunt);

  // uncomment to time each grunt tasks
  // require('time-grunt')(grunt);

  var staticFiles = require('./staticFiles.js');
  var utils = require('./utilsGrunt.js');

  // grunt-replace task main.js
  var mainReplacePatterns = staticFiles.jsLibs;
  mainReplacePatterns.src.requireQueryString = 'v=<%= pkg.version %>';
  mainReplacePatterns.mocks = JSON.parse(JSON.stringify(mainReplacePatterns.src)); // deep copy obj
  mainReplacePatterns.mocks.app = 'appWithMocks';
  mainReplacePatterns.release.requireQueryString = 'v=<%= pkg.version %>';

  // usemin task html
  var useMinHtml = {
    src: utils.prependPath('app', staticFiles.useMinHtml),
    release: utils.prependPath('dist', staticFiles.useMinHtml)
  };

  var modRewrite = require('connect-modrewrite');

  grunt.initConfig({
    // pulls in meta data used by some plugins
    pkg: grunt.file.readJSON('package.json'),

    /**************
     * PATHS, FILES
     *************/

    sass: {
			dist: {
        options : {
                    //style : 'compressed' //no need for config.rb
                    //compass : 'true'
                },
				files: [{
            expand: true,
            cwd: "app/",
            src: ["**/*.scss", '!**/_*.scss'],
            dest: "dist/",
            ext: ".css"
        }]
			}
		},

    // app
    jsFiles: ['app/js/*.js', 'app/feature/**/*.js', 'app/common/**/*.js'],
    cssFiles: ['app/feature/**/*.css', 'app/common/**/*.css'],
    htmlFiles: ['app/*.html', 'app/feature/**/*.html', 'app/common/**/*.html'],
    templateHtmlFiles: ['app/{index,simple}.html'],
    combinedFiles: ['<%= jsFiles %>', '<%= cssFiles %>', '<%= htmlFiles %>'],

    // lib
    libPath: 'app/lib',
    libFiles: '<%= libPath %>/**/**',

    // test
    testPath: 'test/',
    testFiles: '<%= testPath %>{config,e2e,helpers,unit}/*.js',
    mocksPath: 'test/mocks/',
    mocksFiles: '<%= mocksPath %>*.js',
    mocksCombinedFiles: [
      '<%= mocksPath %>setup/mocksStart.js.part',
      '<%= mocksFiles %>',
      '<%= mocksPath %>setup/mocksEnd.js.part'
    ],

    /**************
     * ASSET MGMT
     *************/

    // install front-end assets
    bower: {
      install: {
        options: {
          targetDir: '<%= libPath %>',
          verbose: true,
          copy: false
        }
      }
    },

    /**************
     * HTML ASSETS
     *************/

    //lint HTML
    htmlhint: {
      options: {
        //https://github.com/yaniswang/HTMLHint/wiki/Rules
        //inclusion of a rule will run it, even with false set
        htmlhintrc: '.htmlhintrc'
      },
      pages: {
        src: ['<%= templateHtmlFiles %>']
      }
    },

    //w3c HTML validator
    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        failHard: true,
        reportpath: false,
        reset: true,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'xmlns:ng',
          'Element head is missing a required instance of child element title.'
        ]
      },
      files: {
        src: ['<%= templateHtmlFiles %>']
      }
    },

    /**************
     * CSS ASSETS
     *************/

    // lint CSS
    csslint: {
      options: {
        //https://github.com/stubbornella/csslint/wiki/Rules
        csslintrc: '.csslintrc'
      },
      all: {
        src: '<%= cssFiles %>'
      }
    },

    /**************
     * JS ASSETS
     *************/

    // lint JS
    jshint: {
      js: {
        src: ['<%= jsFiles %>', 'Gruntfile.js']
      },
      tests: {
        src: ['<%= testFiles %>']
      },
      mocks: {
        src: ['<%= mocksFiles %>']
      },
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      }
    },

    // uglify JS
    uglify: {
      options: {
        report: 'gzip'
      },
      dist: {
        files: [
          {
            cwd: 'app/',
            src: ['{common,feature,js}/**/**.js', '!js/main.js'],
            dest: 'dist/',
            expand: true
          }
        ]
      }
    },

    /**************
     * TESTING
     *************/

    // run unit tests
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      single: {
        singleRun: true,
        browsers: ['Chrome', 'Firefox', 'PhantomJS']
      },
      'single-ci': {
        singleRun: true,
        browsers: ['PhantomJS']
      },
      continuous: {
        background: true, //let grunt-watch do the work
        autoWatch: false,
        browsers: ['Chrome']
      }
    },

    // run e2e tests
    protractor: {
      options: {
        keepAlive: true,
        configFile: "protractor.conf.js"
      },
      run: {}
    },

    /**************
     * SERVING
     *************/

    // concat mocks
    concat: {
      mocks: {
        src: '<%= mocksCombinedFiles %>',
        dest: 'app/temp/factoriesMocks.js'
      }
    },

    // serve mocks
    connect: {
      server: {
        options: {
          port: 9005,
          base: 'dist',
          livereload: true,
          hostname: '0.0.0.0',
          open: {
            target: 'http://localhost:9005'
          },
          middleware: function (connect, options) {
            var middlewares = [
              modRewrite(['^.*\\?simple\/.*$ /simple.html [L]']),
              modRewrite(['^[^\\.]*$ /index.html [L]'])
            ];
            options.base.forEach(function (base) {
              return middlewares.push(connect["static"](base));
            });
            return middlewares;
          }
        }
      }
    },

    // performs text replacements
    replace: {
      appWithMocks: {
        options: {
          patterns: [
            {
              match: /\/\*\*\$|\$\*\*\//g,
              replacement: ''
            }
          ]
        },
        files: [
          {
            src: 'app/js/app.js',
            dest: 'app/temp/appWithMocks.js'
          }
        ]
      },
      index: utils.generateReplaceConfigJson(grunt.file.readJSON('customization.json'), 'index.html'),
      'index-release': {
        options: {
          patterns: [
            {
              json: _.merge({}, grunt.file.readJSON('customization.json'), {requireMain: '<%= mainJsLocation %>'})
            }
          ]
        },
        files: [
          {
            src: 'dist/index.html',
            dest: 'dist/index.html'
          }
        ]
      },
      dist: utils.generateReplaceConfigJson(mainReplacePatterns.src, 'js/main.js'),
      'dist-mocks': utils.generateReplaceConfigJson(mainReplacePatterns.mocks, 'js/main.js'),
      'dist-release': utils.generateReplaceConfigJson(mainReplacePatterns.release, 'js/main.js')
    },

    /**************
     * BUILDING
     *************/

    // cleans the pkg and dist directories
    clean: {
      pkg: ['./pkg'],
      dist: ['./dist']
    },

    // creates a tar.gz of the project
    compress: {
      main: {
        options: {
          archive: './pkg/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.tar.gz',
          mode: 'tgz'
        },
        files: [
          {
            src: './dist/**'
          }
        ]
      }
    },

    template: {
      'process-docker-template': {
        options: {
          data: {
            'pkg_name': '<%= pkg.name %>',
            'version': '<%= pkg.version %>'
          }
        },
        files: {
          'pkg/Dockerfile': ['docker/Dockerfile.tpl']
        }
      },
      'process-build-variables': {
        options: {
          data: {
            'pkg_name': '<%= pkg.name %>',
            'version': '<%= pkg.version %>'
          }
        },
        files: {
          'BUILD_VARIABLES': ['docker/BUILD_VARIABLES.tpl']
        }
      }
    },

    // increments the version in the package.json and bower.json
    /*
     bump: {
     options: {
     commit: true,
     commitMessage: 'Release v%VERSION%',
     push: true,
     createTag: true,
     tagName: 'v=<%= pkg.version %>',
     tagMessage: 'Version <%= pkg.version %>'
     },
     files: staticFiles.projectVersionFiles
     },
     */
    bump: {
      options: {
        files: staticFiles.projectVersionFiles,
        updateConfigs: [],
        commit: false,
        commitMessage: 'Release v%VERSION%',
        commitFiles: [],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        globalReplace: false
      }
    },

    // commits the files to bump the version
    gitcommit: {
      task: {
        options: {
          message: 'bump current patch version to v<%= pkg.version %>'
        },
        files: {
          src: staticFiles.projectVersionFiles
        }
      }
    },

    // copy files
    copy: {
      dist: {
        files: [
          {
            cwd: 'app/',
            src: ['**', '!index.html'],
            dest: 'dist/',
            expand: true
          }
        ]
      },
      "dist-release": {
        files: [
          {
            cwd: 'app/',
            src: ['**', '!{common,feature}/**/**.js'],
            dest: 'dist/',
            expand: true
          }
        ]
      },
      temp: {
        files: [
          {
            cwd: 'app/temp/',
            src: ['*'],
            dest: 'dist/js/',
            expand: true
          }
        ]
      }
    },

    // use min
    useminPrepare: {
      html: useMinHtml.src,
      options: {
        dest: 'dist',
        root: 'app'
      }
    },
    usemin: {
      html: useMinHtml.release,
      options: {
        assetsDirs: ['dist']
      }
    },

    // Static asset revisioning through file content hash
    filerev: {
      css: {
        src: ['dist/feature/**/**.css']
      },
      "main-js": {
        src: ['dist/require/main.js']
      }
    },

    /**************
     * UTILITIES
     *************/

    dynamicWatchDistTask: 'dist', // default watch task for dist

    // watch files and run tasks on change
    watch: {
      js: {
        files: ['<%= jsFiles %>', '<%= testFiles %>'],
        tasks: ['<%= dynamicWatchDistTask %>', 'newer:jshint:js', 'karma:continuous:run']
      },
      css: {
        files: ['<%= cssFiles %>'],
        tasks: ['dist', 'css']
      },
      html: {
        files: ['<%= htmlFiles %>'],
        tasks: ['dist', 'html']
      },
      tests: {
        files: ['<%= testFiles %>'],
        tasks: ['newer:jshint:tests', 'karma:continuous:run']
      },
      livereload: {
        options: {
          livereload: true
        },
        // have to watch mocks too because watch does not work with livereload and subtasks
        files: ['<%= combinedFiles %>', '<%= mocksCombinedFiles %>']
      }
    },
    watch_with_mocks: {
      js: {
        files: ['<%= jsFiles %>', '<%= testFiles %>'],
        tasks: ['<%= dynamicWatchDistTask %>', 'newer:jshint:js', 'karma:continuous:run']
      },
      css: {
        files: ['<%= cssFiles %>'],
        tasks: ['mocks-dist', 'css']
      },
      html: {
        files: ['<%= htmlFiles %>'],
        tasks: ['mocks-dist', 'html']
      },
      tests: {
        files: ['<%= testFiles %>'],
        tasks: ['newer:jshint:tests', 'karma:continuous:run']
      },
      mocks: {
        files: ['<%= mocksFiles %>'],
        tasks: ['concat:mocks', 'newer:jshint:mocks', 'karma:continuous:run', 'dist']
      },
      livereload: {
        options: {
          livereload: true
        },
        // have to watch mocks too because watch does not work with livereload and subtasks
        files: ['<%= combinedFiles %>', '<%= mocksCombinedFiles %>']
      }
    },

    // r.js optimizer
    requirejs: {
      compile: {
        options: {
          dir: 'dist/require',
          findNestedDependencies: true,
          baseUrl: "dist/js",
          optimize: 'none',
          mainConfigFile: 'dist/js/main.js',
          modules: [{
            name: 'main'
          }],
          paths: {
            jquery: "empty:",
            fed: "empty:"
          }
        }
      }
    }
  });

  grunt.registerTask('mainjslocator', 'Writes the location of main.js to index.html.', function () {
    grunt.config.set('mainJsLocation', grunt.filerev.summary['dist/require/main.js'].replace('dist', ''));
  });

  grunt.registerTask('watchconfigmocks', 'Configure the watch task to be used for mocks', function () {
    grunt.config.set('dynamicWatchDistTask', 'mocks-dist');
  });

  // dev mode
  grunt.registerTask('default', ['check', 'dist']);
  grunt.registerTask('build', ['dist']);
  grunt.registerTask('dev', ['dist', 'karma:continuous:start', 'watch']);

  // test mode
  grunt.registerTask('test', ['karma:single']);

  // mocks mode
  //grunt.registerTask('mocks', ['mocks-dist', 'connect', 'karma:continuous:start', 'watchconfigmocks', 'watch']);
  //grunt.registerTask('mocks-release', ['release', 'replace:appWithMocks', 'concat:mocks', 'copy:temp',
  //  'connect', 'karma:continuous:start']);

  // dist dir generation
  grunt.registerTask('dist', ['clean:dist', 'replace:index', 'copy:dist', 'replace:dist', 'sass:dist']);
  //grunt.registerTask('mocks-dist', ['clean:dist', 'replace:index', 'copy:dist', 'replace:dist-mocks',
  //  'replace:appWithMocks', 'concat:mocks', 'copy:temp']);

  // file type tasks
  grunt.registerTask('html', ['htmlhint', 'validation']);
  grunt.registerTask('css', ['csslint']);
  grunt.registerTask('js', ['jshint', 'karma:single']);
  grunt.registerTask('js-ci', ['jshint', 'karma:single-ci']);

  // overall checks all file types
  grunt.registerTask('check', ['html', 'css', 'js']);
  grunt.registerTask('check-ci', ['html', 'css', 'js-ci']);

  // release
  grunt.registerTask('release', ['clean:dist', 'copy:dist-release', 'useminPrepare', 'concat:generated', 'cssmin',
    'filerev:css', 'replace:dist-release', 'uglify:dist', 'requirejs', 'usemin', "filerev:main-js", 'mainjslocator',
    'replace:index-release']);
  grunt.registerTask('releaseDev', ['clean:dist', 'dist']);

  // build pipeline
  grunt.registerTask('package', ['release', 'clean:pkg', 'compress']);
  grunt.registerTask('packageDev', ['releaseDev', 'clean:pkg', 'compress', 'template:process-docker-template']);
  grunt.registerTask('on_commit', ['bower', 'package', 'template']);
  grunt.registerTask('commitBuild', ['bower', 'check-ci', 'package', 'template', 'bump::patch', 'gitcommit']);
};
