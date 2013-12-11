// initialize Module
angular.module('mllrsohn.home', ['mllrsohn.common']);

// require Module specifics
require('./homeController');

// require Routes at the end to make sure
// that all the Controllers are available
require('./homeRoutes');