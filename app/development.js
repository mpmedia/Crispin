var express = require('express');

var App = require('Local/App');

App.use(express.logger('dev'));

require('Local/App/Assets')(App);
require('Local/App/Index')(App);
require('Local/App/Qunit')(App);
require('Local/App/404')(App);

App.use(express.errorHandler({
	dumpExceptions:true,
	showStack:true
}));


module.exports = App;
