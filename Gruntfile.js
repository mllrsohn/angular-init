'use strict';
module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: require('./package.json'),
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
    karma: {
      unit: {
        configFile: 'test/client/karma-unit.conf.js',
        autoWatch: true
      },
      e2e: {
        configFile: 'test/client/karma-e2e.conf.js'
      }
    },
    nodemon: {
      dev: {
        options: {
          file: 'server/index.js',
          nodeArgs: ['--harmony'],
          env: {
            PORT: '3030'
          }
        }
      }
    },
    browserify: {
      dev: {
        options: {
          debug: true,
        },
        files: {
          './tmp/js/app.module.js': ['public/app/index.js'],
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

  grunt.registerTask('default', ['clean:tmp', 'concurrent:dev', 'nodemon:dev', 'watch']);
};