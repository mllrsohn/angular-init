/*
 * client/js/main/index.js
 */

'use strict';

var angular = require('angular'),
    ngModule = angular.module('mllrsohn.main', []);

// Controllers
require('./controllers/home')(ngModule);

// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider
    .state('app.home', {
      url: '/',
      views: {
        '@': {
          controller: 'HomeCtrl',
          templateUrl: 'app/main/templates/home.html'
        }
      }
    });
});
