
var LocalStrategy = require('passport-local').Strategy;

module.exports = function () {

	return new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},

		function (email, password, done) {

			if (email === 'test@test.com') {
				if (password === 'test') {
					done(null, true);
				} else {
					done(null, false, { message: 'Incorrect Password'});
				}
			} else {
				done(null, false, { message: 'Email not found.' });
			}

	/*
			//Retrieve the user from the database by login
			User.findOne({login: username}, function (err, user) {

				//If something weird happens, abort.
				if (err) {
					return done(err);
				}

				//If we couldn't find a matching user, flash a message explaining what happened
				if (!user) {
					return done(null, false, { message: 'Login not found' });
				}

				//Make sure that the provided password matches what's in the DB.
				if (!user.passwordMatches(password)) {
					return done(null, false, { message: 'Incorrect Password' });
				}

				//If everything passes, return the retrieved user object.
				done(null, user);

			});
	*/


		}
	);
};
