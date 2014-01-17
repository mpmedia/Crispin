
var pathResolve = require('path').resolve,
	Handlebars = require('handlebars'),
	_ = require('lodash');

/** Handlebars Extensions *****************************************************************************************************************/

require('helper-hoard').load(Handlebars);

var root = __dirname + '/../views/';
var templateCache = {};

function loadTemplate (src) {
	var isLocal = src.substr(0,5) === 'Local';
	var fullpath = isLocal ? src+'.hbs.html' : 'views/'+src+'.hbs.html';
	var actualpath = isLocal ? pathResolve(root+'../'+src+'.hbs.js') : pathResolve(root+src+'.hbs.js');

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

	var context = Object.create(this || {});

	var opts = {}, input;
	if (options.fn) {
		input = options.fn(this);
		try {
			opts = JSON.parse(input);
		} catch (e) {
			console.log(e, input);
			opts = {};
		}
	}

	if (options.hash) {
		_.assign(opts, options.hash);
	}

	var content = (new Component(opts)).render(context);

	return new Handlebars.SafeString(content);
});

/** View Class *****************************************************************************************************************/

var View = function (name, options) {
	options = options || {};
	this.name = name;
	this.root = options.root;
	this.path = name;
};

View.prototype.render = function(options, fn){
	fn(false, loadTemplate(this.path)(options));
};

module.exports = View;
