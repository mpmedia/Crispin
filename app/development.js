var express = require('express');

var App = require('Local/App');


// custom dev logger that shows worker id.
require('Local/App/DevLog')(App);

require('Local/App/Authentication')(App);
require('Local/App/Assets')(App);
require('Local/App/Index')(App);
require('Local/App/Qunit')(App);
require('Local/App/404')(App);

App.use(express.errorHandler({
	dumpExceptions:true,
	showStack:true
}));


module.exports = App;

App.listen(process.env.PORT || 8000);
console.log("Now listening on port " + (process.env.PORT || 8000));
