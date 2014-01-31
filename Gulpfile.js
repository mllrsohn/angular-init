// Gulpfile.js
// Require the needed packages
var lr = require('tiny-lr');
var gulp = require('gulp');
var fs = require('fs');
var stylus = require('gulp-stylus');
var rimraf = require('gulp-rimraf');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var refresh = require('gulp-livereload');
var lrserver = lr();
var spawn = require('child_process').spawn;
var karma = require('gulp-karma');
var protractor = require('gulp-protractor');
var path = require('path');
var mkdirp = require('mkdirp');
var handlebars = require('handlebars');

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
    gulp.run('lr-server', 'nodemon', 'scripts', 'stylus');

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
        'public/app/node_modules/bower_components/json3/lib/json3.js',
        'test/client/helper/**/*.js',
        'test/client/mocha.conf.js',
        'public/app/index.js',
        'public/app/**/*.html',
        'public/app/node_modules/bower_components/angular-mocks/angular-mocks.js',
        'test/client/specs/**/*.js'
    ]).pipe(karma({
        configFile: './test/client/karma.config.js',
        action: 'watch'
    }));
});



// Setting up the test task
gulp.task('g', function(cb) {
    var basePath = './public/app';
    var basePathTest = './test/client/specs';
    var generators = './generators';
    var baseApp = 'mllrsohn';
    var n;

    var scaffold = {
        module: function (name) {
            ['controllers', 'providers', 'directives', 'filters', 'templates'].forEach(function(item) {
                mkdirp.sync(path.join(basePath, name, item));
            });

            ['controllers', 'providers', 'directives', 'filters'].forEach(function(item) {
                mkdirp.sync(path.join(basePathTest, name, item));
            });

        },
        checkName: function () {
            var n = gulp.env.name.split(':');
            if(n.length !== 2) {
                console.log('Please Provide the name as in module:name. eg: admin:list');
                return cb();
            } else {
                return n;
            }
        },

        compile: function (template, vars, mpath) {
            mkdirp.sync(mpath);
            vars.fn = path.join(mpath, vars.filename);
            var gc = fs.readFileSync(path.join(generators, template));
            var t = handlebars.compile(gc.toString());
            fs.writeFileSync(vars.fn, t(vars));
        },
        index: function (module) {
            scaffold.compile('index.hbs', {
                module: module,
                filename: 'index.js',
                base: baseApp
            }, path.join(basePath, module), 'index');
        },
        controller: function (module, name) {
            scaffold.compile('controller.hbs', {
                module: module,
                name: name,
                filename: name+'Ctr.js'
            }, path.join(basePath, module, 'controllers'));
        },
        controllerTest: function (module, name) {
            scaffold.compile('controller_test.hbs', {
                module: module,
                name: name,
                base: baseApp,
                filename: name+'Ctr.js'
            }, path.join(basePathTest, module, 'controllers'));
        },
        template: function (module, name) {
            scaffold.compile('template.hbs', {
                module: module,
                filename: name+'.html'
            }, path.join(basePath, module, 'templates'));
        },
        directive: function (module, name) {
            scaffold.compile('directive.hbs', {
                module: module,
                name: name,
                base: baseApp,
                filename: name+'.js'
            }, path.join(basePath, module, 'directives'));
        },
        directiveTest: function (module, name) {
            scaffold.compile('directive_test.hbs', {
                module: module,
                name: name,
                base: baseApp,
                filename: name+'.js'
            }, path.join(basePathTest, module, 'directives'));
        },
        provider: function (module, name) {
            scaffold.compile('provider.hbs', {
                module: module,
                name: name,
                base: baseApp,
                filename: name+'.js'
            }, path.join(basePath, module, 'providers'));
        },
        providerTest: function (module, name) {
            scaffold.compile('provider_test.hbs', {
                module: module,
                name: name,
                base: baseApp,
                filename: name+'.js'
            }, path.join(basePathTest, module, 'providers'));
        }
    };

    if(gulp.env.type === 'module') {
        if (fs.existsSync(path.join(basePath, gulp.env.name))) {
            scaffold.module(gulp.env.name);
            console.log('Module ' + gulp.env.name + ' already exists');
        } else {
            scaffold.module(gulp.env.name);
            scaffold.index(gulp.env.name);
            scaffold.controller(gulp.env.name, gulp.env.name);
            scaffold.controllerTest(gulp.env.name, gulp.env.name);
            scaffold.template(gulp.env.name, gulp.env.name);
        }
    }

    if(gulp.env.type === 'd') {
        n = scaffold.checkName(gulp.env.name);
        scaffold.directive(n[0], n[1]);
        scaffold.directiveTest(n[0], n[1]);
    }

    if(gulp.env.type === 'p') {
        n = scaffold.checkName(gulp.env.name);
        scaffold.provider(n[0], n[1]);
        scaffold.providerTest(n[0], n[1]);
    }

    if(gulp.env.type === 'c') {
        n = scaffold.checkName(gulp.env.name);
        scaffold.controller(n[0], n[1]);
        scaffold.controllerTest(n[0], n[1]);
    }

});