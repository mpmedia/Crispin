
var Component = require('Local/Components/Base');
var template = require('./carousel.hbs.js')(require('handlebars'))['Local/Components/Bootstrap/Carousel/carousel.hbs.html'];
var _ = require('lodash');

module.exports = Component.extend({
	template: template,
	initialize: function (options) {
		options = options || {};
		this.templateData = {
			id: options.id || _.uniqueId('carousel'),
			items: options.items || []
		};
	}
});
