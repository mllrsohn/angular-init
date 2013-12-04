var express = require('express');
var app = express();
var cons = require('consolidate');


/* Settings */
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


/* Default Route for html routing */
app.get('/', function(req, res) {
    res.render('index');
});



module.exports = app;