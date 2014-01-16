
var pathResolve = require('path').resolve,
	fsExists = require('fs').existsSync,
	Handlebars = require('handlebars'),
	_ = require('lodash');

/** Handlebars Extensions *****************************************************************************************************************/

require('helper-hoard').load(Handlebars);

var root = __dirname + '/../views/';
var templateCache = {};

function loadTemplate (src) {
	var fullpath = 'views/'+src+'.hbs.html';
	var actualpath = pathResolve(root+src+'.hbs.js');

	if (templateCache[fullpath]) {
		return templateCache[fullpath];
	} else {
		var templates = require(actualpath)(Handlebars);

		if (templates[fullpath] !== undefined) {
			_.assign(templateCache, templates);
			return templateCache[fullpath] = templates[fullpath];
		} else {
			throw new Error('Template for '+fullpath+' was not found in the file at '+actualpath);
		}
	}
}

Handlebars.registerHelper('require', function (path) {
	Handlebars.registerPartial(path, loadTemplate(path));
});

Handlebars.registerHelper('component', function (path, options) {
	var Component = require('Local/Components/'+path);

	var content = (new Component(options.hash)).render(this);

	return new Handlebars.SafeString(content);
});

/** View Class *****************************************************************************************************************/

var View = function (name, options) {
	options = options || {};
	this.name = name;
	this.root = options.root;
	this.path = name;
};

View.prototype.lookup = function(path){
	path = pathResolve(this.root, path);

	if (fsExists(path+'.hbs.js')) {
		return path;
	} else {
		console.log(path);
	}
};

View.prototype.render = function(options, fn){
	fn(false, loadTemplate(this.path)(options));
};

module.exports = View;
