
var manyGlob = require('Local/Lib/ManyGlob');

module.exports = function (app) {

	app.get(/^\/qunit\/?(.*)$/, function (req, res) {

		var patterns = req.params[0] && [req.params[0]] || ['assets/components/**/*qunit.js', 'assets/js/**/*qunit.js', '!assets/js/vendor/**/*.js'];

		manyGlob(patterns, {cwd: __dirname + '/../../www/'}, function (files) {

			res.render('pages/qunit', {
				title: 'QUnit Test Runner',
				files: files,
				tests: JSON.stringify(files.map(function (d) { return '/'+d; }))
			});

		});

	});

	app.get(/^\/Components\/(.*)$/, function (req, res) {

		var component = req.params[0];

		if (!component) {
			res.send(403, 'You must specify a component name');
			return;
		}

		var demoPath = 'Local/Components/'+component+'/demo';

		res.render(demoPath, {
			title: component
		});

	});

};

