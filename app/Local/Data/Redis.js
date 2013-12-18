
var Config = require('Local/Config');
var redis = require('redis');

var client = new redis.createClient(Config.redis.port, Config.redis.host, Config.redis);
if (Config.redis.password) {
	client.auth(Config.redis.password, function(err){
		if (err) {
			throw err;
		}
	});
}

module.exports = client;
