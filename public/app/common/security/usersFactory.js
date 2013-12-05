angular.module('mllrsohn.common').factory('Users', function() {
    var Users = {};

    Users.getUser = function() {
        return 'Bob';
    };

    return Users;
});