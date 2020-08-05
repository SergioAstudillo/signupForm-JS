const express = require('express');
const router = express.Router();
const passport = require('passport');
//Import the connection created in database.js
const pool = require('../database');
//Import the timestamp created by timeago.js
const time = require('../lib/timeago');
//Import 2 methods to check if the user is already logged in or not.
const { userLoggedIn, userNotLoggedIn } = require('./../lib/routesProtection');

/* Receive the form in POST and insert the data in the DB. After that it redirects to /profile */
router.post(
	'/signup',
	userNotLoggedIn,
	passport.authenticate('local.signup', {
		successRedirect: '/login',
		failureRedirect: '/signup',
		successFlash: true,
		failureFlash: true,
		session: false,
	}),
);

/* Receive the form in POST and compare it with the correspondent DB registry */
router.post('/login', userNotLoggedIn, (req, res, next) => {
	passport.authenticate('local.login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		successFlash: true,
		failureFlash: true,
	})(req, res, next);
});

/* Retrieve the data from the DB when the user is logged in. It shows that data */
router.get('/profile', userLoggedIn, async (req, res) => {
	try {
		/* Import the user email, fullname and the time of creation to show on /profile. It imports the correct title and css too. */
		const account = require('./../lib/passport');
		res.render('profile', { title: 'User Profile', css: '/public/css/profile.css', account });
	} catch (err) {
		console.error(err);
		console.error('There has been an error loading the /profile page.');
	}
});

router.get('/profile/edit', userLoggedIn, (req, res) => {
	try {
		/* Import the user email, fullname and the time of creation to show on /profile/edit. It imports the correct title and css too. */
		const account = require('./../lib/passport');
		res.render('editProfile', { title: 'Edit user profile', css: '/public/css/editProfile.css', account });
	} catch (err) {
		console.error(err);
		console.error('There has been an error loading the /profile/edit page.');
	}
});

/* Receive the form in POST and update the data in the DB. After that it redirects to /profile */
router.post('/profile/edit', userLoggedIn, (req, res, next) => {
	passport.authenticate('local.profileEdit', {
		successRedirect: '/profile',
		failureRedirect: '/profile/edit',
		successFlash: true,
		failureFlash: true,
	})(req, res, next);
});

//Export router module.
module.exports = router;
