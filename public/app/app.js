/*
 * public/app/app.js
 */

'use strict';

var angular = require('angular');

var ngModule = angular.module('mllrsohn', [
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'mllrsohn.common',
  'mllrsohn.layout',
  'mllrsohn.main'
]);

// Enable HTML5 Mode.
ngModule.config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
});