
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

var overridePath = path.resolve(__dirname + '/../config.json');


var base = {
	sessions: {
		secret: 'Amet Commodo Ornare Parturient Etiam',
		cookieKey: 'taftotita'
	},
	paths: {
		root: path.resolve(__dirname + '/../'),
		assets: path.resolve(__dirname + '/../www'),
		uploadDir: '/tmp/crispin/uploads'
	},
	redis: {
		host: 'localhost',
		port: 6380,
		database: {
			sessions: 1,
		},
		password: false
	},
	mysql: {
		host:     'localhost',
		username: 'crispin',
		password: 'crispin',
		database: {
			main: 'crispin'
		}
	},
	maxFormSize: 1024 * 1024 * 1, //1mb
	maxUploadSize: 1024 * 1024 * 100, //100mb
};


// if an override file exists, load it and map its values overtop of the base config
if (fs.existsSync(overridePath)) {
	var overrides = require(overridePath);

	_.merge(base, overrides, function(a, b) {
		return _.isArray(a) ? a.concat(b) : undefined;
	});
}


module.exports = base;
