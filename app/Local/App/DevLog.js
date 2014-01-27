var express = require('express');
var cluster = require('cluster');
var bytes = require('bytes');

module.exports = function (App) {
	App.use(express.logger(function(tokens, req, res){
		var status = res.statusCode,
			len = parseInt(res.getHeader('Content-Length'), 10),
			color = 32;

		if (status >= 500) {color = 31;}
		else if (status >= 400) {color = 33;}
		else if (status >= 300) {color = 36;}

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

}
