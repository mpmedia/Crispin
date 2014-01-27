
var passport = require('passport');

module.exports = exports = function (App) {

	passport.use(require('Local/App/Authentication/LocalUser')());

	passport.serializeUser(function (user, done) {
		done(null, user ? 'true' : '');
	});

	passport.deserializeUser(function (id, done) {

		done(null, !!id);

		// User.findOne({_id: id}, function (err, user) {
		// 	done(null, user);
		// });
	});

	//add passport middleware
	App.use(passport.initialize());
	App.use(passport.session());
	App.use(function (req, res, next) {
		if (req.isAuthenticated()) {
			res.locals.user = req.user;
		}
		next();
	});

	//setup endpoints
	App.get('/login', exports.getLogin);
	App.post('/login', exports.postLogin);
	App.all('/logout', exports.allLogout);

};

exports.getLogin = function (req, res) {
	res.render('pages/login', {
		messages: req.flash('error')
	});
};

exports.postLogin = function (req, res) {
	passport.authenticate('local', {
		successRedirect: req.session && req.session.goingTo || '/profile',
		failureRedirect: "/login",
		failureFlash: true
	})(req, res);
};

exports.allLogout = function (req, res) {
	req.logout();
	res.redirect('/login');
};
