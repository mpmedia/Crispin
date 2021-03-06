var express = require('express');
var connectRedis = require('connect-redis')(express);
var flash = require('connect-flash');

var Config = require('Local/Config');

var App = express();

App.set('view', require('Local/View'));
App.set('views', __dirname + '/../views/');

//handle favicons very first thing, as they don't need any other processing
App.use(express.favicon(Config.paths.assets + '/favicon.ico'));

// Cookie processing
App.use(express.cookieParser());

// Post/Put Data handling
App.use(express.json({
	limit: Config.maxFormSize
}));

App.use(express.urlencoded({
	limit: Config.maxFormSize
}));

// Sessions
App.use(express.session({
	// store: new connectRedis({
	// 	host: Config.redis.host,
	// 	port: Config.redis.port,
	// 	db:   Config.redis.database.sessions,
	// 	pass: Config.redis.password
	// }),
	secret: Config.sessions.secret,
	key: Config.sessions.cookieKey
}));

App.use(flash());

module.exports = App;
