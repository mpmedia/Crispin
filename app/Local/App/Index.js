
//map endpoints
module.exports = exports = function (app) {

	app.get('/', exports.getIndex);

};

exports.getIndex = function (req, res) {
	res.render('pages/index', {
		title: 'Layout Test'
	});
};
