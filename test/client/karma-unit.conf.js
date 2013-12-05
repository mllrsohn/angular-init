var shared = require('./karma-shared.conf');

module.exports = function(config) {
  shared(config);

  config.files = shared.files.concat([

    //extra testing code
    'node_modules/vendor/angular-mocks/angular-mocks.js',

    //test files
    './test/client/specs/**/*.js'
  ]);
};