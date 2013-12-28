module.exports = function(config) {
    config.set({
        basePath: '../../',
        frameworks: ['mocha', 'browserify'],
        reporters: ['progress'],
        browsers: ['IE8 - WinXP', 'Chrome'],
        preprocessors: {
            '**/*.html': ['ng-html2js'],
            'public/app/index.js': ['browserify'],
            'test/client/helper/libs.js': ['browserify']
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
            watch: true
        }
    });
};