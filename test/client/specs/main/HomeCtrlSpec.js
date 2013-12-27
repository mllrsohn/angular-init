describe('Unit: Testing Configurator Controller', function() {
    var HomeCtrl, scope;

    beforeEach(function() {
        angular.mock.module('mllrsohn.main');
    });

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        HomeCtrl = $controller('HomeCtrl', {
            $scope: scope
        });
    }));

    it('should be available', function() {
        expect(HomeCtrl).to.not.be.undefined;
    });
});
