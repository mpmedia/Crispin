var express = require('express');
var Config = require('Local/Config');

module.exports = function (App) {

	App.use('/assets', express.static(Config.paths.assets + '/assets'));

};
