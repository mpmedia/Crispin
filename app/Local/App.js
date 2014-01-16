var express = require('express');
var connectRedis = require('connect-redis')(express);
var flash = require('connect-flash');

var Config = require('Local/Config');

var app = express();

app.set('view', require('Local/View'));
app.set('views', __dirname + '/../views/');

// Cookie processing
app.use(express.cookieParser());

// Post/Put Data handling
app.use(express.json({
	limit: Config.maxFormSize
}));

app.use(express.urlencoded({
	limit: Config.maxFormSize
}));

// Sessions
app.use(express.session({
	store: new connectRedis({
		host: Config.redis.host,
		port: Config.redis.port,
		db:   Config.redis.database.sessions,
		pass: Config.redis.password
	}),
	secret: Config.sessions.secret,
	key: Config.sessions.cookieKey
}));

app.use(flash());

module.exports = app;
