
module.exports = function (app) {

	app.get('/qunit', function (req, res) {
		var page = require('Local/View')('Page/Qunit');
		res.send(page({
			title: 'QUnit Test Runner',
			tests: JSON.stringify([
				"/assets/components/example/qunit.js"
			])
		}));
	});

};
