var bower = require('./../bower.json');

var shared = function(config) {
    config.set({
        basePath: '../',
        frameworks: ['mocha', 'browserify'],
        reporters: ['progress'],
        browsers: ['Chrome'],
        preprocessors: {
            '**/*.html': ['ng-html2js'],
            'public/app/**/*.js': ['coverage'],
            'test/*': ['browserify']
        },
        ngHtml2JsPreprocessor: {
            stripPrefix: 'public/'
        },
        autoWatch: true,
        // these are default values anyway
        singleRun: false,
        colors: true,
        coverageReporter: {
            type: 'html',
            dir: 'test/coverage/'
        },
        browserify: {
            // extensions: ['.coffee'],
            // ignore: [],
            // transform: ['coffeeify'],
            // debug: true,
            // noParse: ['jquery'],
            watch: true,
        }
    });
};

// Mocha config
shared.files = [
    'test/mocha.conf.js',
    'public/app/*.js',
    'public/app/**/*.js',
    'public/app/**/*.html'
];

module.exports = shared;