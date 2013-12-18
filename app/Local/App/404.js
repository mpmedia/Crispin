
module.exports = function (App) {

	App.use(function(req, res){
		res.send(404, 'Sorry cant find that!');
	});

};
