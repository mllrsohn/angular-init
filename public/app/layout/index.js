/*
 * public/app/layout/index.js
 */

'use strict';

var angular = require('angular'),
    ngModule = angular.module('mllrsohn.layout', []);

// Controllers
require('./controllers/navigation')(ngModule);

// Routes
ngModule.config(function($stateProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      views: {
        footer: {
          templateUrl: 'app/layout/templates/_footer.html'
        },
        header: {
          templateUrl: 'app/layout/templates/_header.html'
        },
        nav: {
          templateUrl: 'app/layout/templates/_nav.html',
          controller: 'NavigationCtrl'
        }
      }
    });
});