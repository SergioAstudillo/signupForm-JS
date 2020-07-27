module.exports = {
	/* This will get executed ONLY when the user IS NOT logged in. */
	userLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		req.flash('userLoggedIn', 'Please, log in first to go there.');
		return res.redirect('/login');
	},

	/* This will get executed ONLY when the user IS logged in. */
	userNotLoggedIn(req, res, next) {
		if (!req.isAuthenticated()) {
			return next();
		}
		req.flash('userNotLoggedIn', 'Please, log out first to go there.');
		return res.redirect('/profile');
	},
};
