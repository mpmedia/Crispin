
var Component = require('Local/Components/Base');
var template = require('./main.hbs.js')(require('handlebars'))['Local/Components/Bootstrap/RadioGroup/main.hbs.html'];
var _ = require('lodash');

module.exports = Component.extend({
	template: template,
	render: function (data) {
		if (!data.id) {
			data = Object.create(data);
			data.id = _.uniqueId('carousel');
		}

		return this.template(data);
	}
});
