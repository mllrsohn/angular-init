angular.module('mllrsohn.home').config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'app/home/templates/home.tpl.html',
        controller: 'HomeCtrl'
    });
});