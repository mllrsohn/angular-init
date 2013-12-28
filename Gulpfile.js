// Gulpfile.js
// Require the needed packages
var lr = require('tiny-lr');
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var rimraf = require('gulp-rimraf');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var refresh = require('gulp-livereload');
var lrserver = lr();
var spawn = require('child_process').spawn;
var karma = require('gulp-karma');


// Variables
var paths = {
    stylus: {
        src: './public/stylus/*.styl',
        dest: './tmp/css'
    },
    tmp: {
        src: './tmp'
    },
    tests: {
        src: './test/stylus/*.styl',
    }
};


// Compile stylus
gulp.task('stylus', function() {
    gulp.src(paths.stylus.src)
        .pipe(stylus())
        .pipe(gulp.dest(paths.stylus.dest))
        .pipe(refresh(lrserver));
});


// Compile Browserify
gulp.task('scripts', function() {
    //single entry point to browserify
    return gulp.src(['./public/app/index.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(concat('app.module.js'))
        .pipe(gulp.dest('./tmp/js'))
        .pipe(refresh(lrserver));
});

// lr-server
gulp.task('lr-server', function() {
    lrserver.listen(35729, function(err) {
        if (err) return console.log(err);
    });
});

// Nodemon Server, we watch for changes withn server and with harmony
gulp.task('nodemon', function(cb) {
    spawn('./node_modules/.bin/nodemon', ['--watch', 'server', '--debug', '--harmony', 'server/index.js'], {
        stdio: 'inherit'
    })
        .on('close', function() {
            cb();
        });
});


// Setting up the default Task
gulp.task('default', function() {

    // We clean the tmp folder
    gulp.src(paths.tmp.src).pipe(rimraf());

    // We run stylus
    gulp.run('lr-server', 'nodemon', 'stylus', 'scripts');

    // Watch for Stylus
    gulp.watch(paths.stylus.src, function() {
        gulp.run('stylus');
    });

    // Watch for browserify
    gulp.watch('./public/app/**/*.js', function() {
        gulp.run('scripts');
    });

});

// Setting up the test task
gulp.task('karma', function() {
    gulp.src([
        'test/client/helper/libs.js',
        'test/client/mocha.conf.js',
        'public/app/index.js',
        'public/app/**/*.html',
        'public/app/node_modules/bower_components/angular-mocks/angular-mocks.js',
        'test/client/helper/**/*.js',
        'test/client/specs/**/*.js'
    ]).pipe(karma({
        configFile: './test/client/karma.config.js',
        action: 'watch'
    }));
});