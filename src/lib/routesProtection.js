module.exports = {
	isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		req.flash('alreadyLoggedIn', 'If you want to go there, please log out first.');
		return res.redirect('/login');
	},

	isNotLoggedIn(req, res, next) {
		if (!req.isAuthenticated()) {
			next();
		}
		req.flash('notLoggedIn', 'Please log in with your account first.');
		return res.redirect('/profile');
	},
};
