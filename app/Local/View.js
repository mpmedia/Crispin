
var Handlebars = require('handlebars');
var _ = require('lodash');

require('Local/Lib/HandlebarsHelpers')(Handlebars);

var templates = {};

function loadTemplate (path) {
	var fullpath = 'Local/View/'+path+'.hbs.html';
	var actualpath = __dirname+'/View/'+path+'.hbs.js';

	//if we've already loaded that template, just grab it.
	if (templates[fullpath]) {
		return templates[fullpath];
	} else {
		var newTemplates = require(actualpath)(Handlebars);

		if (newTemplates[fullpath] !== undefined) {
			_.assign(templates, newTemplates);
			return templates[fullpath] = newTemplates[fullpath];
		} else {
			throw 'Local/View: Template for '+fullpath+' was not found in the file at '+actualpath;
		}
	}
}

module.exports = loadTemplate;

//helper function to preload a partial for use elsewhere in the file
Handlebars.registerHelper('require', function (path) {
	Handlebars.registerPartial(path, loadTemplate(path));
});
