var koa = require('koa');
var path = require('path');
var serve = require('koa-static');
var views = require('co-views');
var compress = require('koa-compress');
var logger = require('koa-logger');
var router = require('koa-router');
var responseTime = require('koa-response-time');


var koaBrowserify = require('./koa-browserify');

// App and Views
var app = koa();
var render = views('server/views', {
    map: {
        html: 'swig'
    }
});

var env = process.env.NODE_ENV || 'development';

// tmp path for development
if(env === 'development') app.use(serve('tmp'));

// public folder
app.use(serve('public'));

// Logging
if (env !== 'test') app.use(logger());

// Response Time
app.use(responseTime());

// Compression
app.use(compress());

// Router
app.use(router(app));


// Load API Paths
//require('./api/users')(app);

// Base route
app.get('/', function *(next) {
  this.body = yield render('index');
});

// Listing
app.listen(3000);
console.log('listening on port 3000');