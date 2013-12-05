'use strict';
module.exports = function(grunt) {

  var _ = grunt.util._,
    pkg = require('./package.json'),
    path = require('path');

  // configurable paths
  var yeomanConfig = {
    app: 'public',
    dist: 'build'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {}


  // Grunt Utils
  // ==============

  require('time-grunt')(grunt);

  // grunt.initConfig
  // =======
  grunt.initConfig({
    pkg: pkg,
    watch: {
      browserify: {
        files: ['public/app/**/*.js'],
        tasks: ['browserify:dev']
      },
      stylus: {
        files: ['public/stylus/**/*.styl'],
        tasks: ['stylus:dev']
      }
    },
    clean: {
      tmp: ['./tmp']
    },
    express: {
      options: {
        port: 3030,
        hostname: '*'
      },
      livereload: {
        options: {
          server: path.resolve('./server'),
          livereload: true,
          serverreload: false,
          bases: [path.resolve('./tmp'), path.resolve(__dirname, yeomanConfig.app)]
        }
      },
      test: {
        options: {
          server: path.resolve('./server'),
          bases: [path.resolve('./tmp'), path.resolve(__dirname, 'test')]
        }
      },
      dist: {
        options: {
          server: path.resolve('./server'),
          bases: path.resolve(__dirname, yeomanConfig.dist)
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },
    browserify: {
      options: {
        debug: true,
        transform: ['debowerify'],
      },
      dev: {
        files: {
          './tmp/js/app.module.js': ['public/app/app.js'],
        }
      }
    },
    stylus: {
      dev: {
        files: {
          './tmp/css/screen.css': 'public/stylus/screen.styl'
        }
      }
    },
    concurrent: {
      dev: [
        'stylus:dev',
        'browserify:dev'
      ]
    }
  });


  // Dependencies
  // ============
  for (var name in pkg.devDependencies) {
    if (name.substring(0, 6) === 'grunt-') {
      grunt.loadNpmTasks(name);
    }
  }

  grunt.registerTask('default', ['clean:tmp', 'concurrent:dev', 'express:livereload', 'open', 'watch']);
};