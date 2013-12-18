
var Config = require('Local/Config');

var mysql      = require('mysql');
var pool  = mysql.createPool({
	host     : Config.mysql.host,
	user     : Config.mysql.username,
	password : Config.mysql.password,
	database : Config.mysql.database.main
});

module.exports = pool;
