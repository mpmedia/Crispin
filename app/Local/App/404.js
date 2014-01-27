
module.exports = exports = function (App) {

	App.use(exports.notFound);

};

exports.notFound = function(req, res){
	res.send(404, 'Sorry cant find that!');
};
