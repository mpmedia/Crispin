var express = require('express');

var App = require('Local/App');

// custom dev logger that shows worker id.
var cluster = require('cluster');
var bytes = require('bytes');
App.use(express.logger(function(tokens, req, res){
	var status = res.statusCode,
		len = parseInt(res.getHeader('Content-Length'), 10),
		color = 32;

	if (status >= 500) color = 31
	else if (status >= 400) color = 33
	else if (status >= 300) color = 36;

		len = isNaN(len) ? '' : len = ' - ' + bytes(len);

		return [
			'\x1b[90m',
			cluster.worker && cluster.worker.id + ' ' || '',
			req.method,
			' ' + req.originalUrl,
			' \x1b[' + color + 'm',
			res.statusCode,
			' \x1b[90m',
			(new Date - req._startTime),
			'ms' + len,
			'\x1b[0m'
		].join('');
}));

// App.use(express.logger('dev'));

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
