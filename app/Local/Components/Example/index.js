
var Component = require('Local/Components/Base');
var template = require('./backend.hbs.js')(require('handlebars'))['Local/Components/Example/backend.hbs.html'];

module.exports = Component.extend({
	template: template
});
