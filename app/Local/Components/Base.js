
var Klass = require('backbone-class');

module.exports = Klass.extend({
	template: false,
	initialize: function () {},
	render: function (data) {
		if (typeof this.template === 'string') {
			return this.template;
		}

		if (typeof this.template === 'function') {
			return this.template(data);
		}

		return '';
	}
});
