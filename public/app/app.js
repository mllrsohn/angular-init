// Vendors
require('angular');
require('angular-ui-router');


// Application specifics: Generall
require('./common/common');

// Application specifics: Pages
require('./home/home');

// Kick off the app
angular.module('mllrsohn', [
    'ui.router',
    'mllrsohn.common',
    'mllrsohn.home'

]).config(function($urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

}).controller('AppCtrl', function() {

});