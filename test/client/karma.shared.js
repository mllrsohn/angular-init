var shared = function(config) {
    config.set({
        basePath: '../../',
        frameworks: ['mocha', 'browserify'],
        reporters: ['progress'],
        browsers: ['Chrome'],
        preprocessors: {
            '**/*.html': ['ng-html2js'],
            'public/app/app.js': ['browserify']
        },
        ngHtml2JsPreprocessor: {
            stripPrefix: 'public/'
        },
        autoWatch: true,
        singleRun: false,
        colors: true,
        coverageReporter: {
            type: 'html',
            dir: 'test/coverage/'
        },
        browserify: {
            transform: ['debowerify'],
            watch: true
        }
    });
};

// Mocha config
shared.files = [
    'node_modules/chai/chai.js',
    'test/client/helper/libs.js',
    'test/client/mocha.conf.js',
    'public/app/app.js',
    'public/app/**/*.html'
];

module.exports = shared;