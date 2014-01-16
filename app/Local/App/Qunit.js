
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

};

