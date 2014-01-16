
var passport = require('passport');

module.exports = function (App) {

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

	App.use(passport.initialize());
	App.use(passport.session());
	App.use(function (req, res, next) {
		if (req.isAuthenticated()) {
			res.locals.user = req.user;
		}
		next();
	});


	App.get('/login', function (req, res) {
		res.render('pages/login', {
			messages: req.flash('error')
		});
	});

	App.post('/login', function (req, res) {

	    passport.authenticate('local', {
	        successRedirect: req.session && req.session.goingTo || '/profile',
	        failureRedirect: "/login",
	        failureFlash: true
	    })(req, res);

	});

	App.get('/logout', function (req, res) {
	    req.logout();
	    res.redirect('/login');
	});

};
