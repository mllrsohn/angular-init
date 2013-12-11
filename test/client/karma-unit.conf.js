var shared = require('./karma.shared.js');

module.exports = function(config) {
  shared(config);

  config.files = shared.files.concat([

    //extra testing code
    'public/vendor/angular-mocks/angular-mocks.js',

    './test/client/helper/**/*.js',

    //test files
    './test/client/specs/**/*.js'
  ]);
};