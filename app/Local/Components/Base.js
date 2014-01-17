
var Klass = require('backbone-class');

module.exports = Klass.extend({
	template: false,
	templateData: {},
	initialize: function () {},
	render: function () {
		if (typeof this.template === 'string') {
			return this.template;
		}

		if (typeof this.template === 'function') {
			return this.template(this.templateData);
		}

		return '';
	}
});
