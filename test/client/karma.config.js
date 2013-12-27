module.exports = function(config) {
    config.set({
        basePath: '../../',
        frameworks: ['mocha', 'browserify'],
        reporters: ['progress'],
        browsers: ['Chrome'],
        preprocessors: {
            '**/*.html': ['ng-html2js'],
            'public/app/index.js': ['browserify'],
            'test/client/helper/**/*.js': ['browserify']
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
        },
        files: [
            'test/client/helper/libs.js',
            'test/client/mocha.conf.js',
            'public/app/index.js',
            'public/app/**/*.html',
            'public/app/node_modules/bower_components/angular-mocks/angular-mocks.js',
            'test/client/helper/**/*.js',
            'test/client/specs/**/*.js'
        ]
    });
};