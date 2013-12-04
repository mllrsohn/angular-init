// Vendors
require('angular/angular');
require('ui-router/release/angular-ui-router');

// Application specifics
require('./home/home');

angular.module('mllrsohn', [
    'ui.router',
    'mllrsohn.home'
]).config(function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/home');

}).controller('AppCtrl', function() {

});