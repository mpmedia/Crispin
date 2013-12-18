
module.exports = function (app) {

	app.get('/', function (req, res) {
		var page = require('Local/View')('Page/Index');
		res.send(page({
			title: 'Layout Test'
		}));
	});

};
