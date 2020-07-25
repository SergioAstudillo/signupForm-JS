const express = require('express');
const router = express.Router();
const passport = require('passport');
//Import the connection created in database.js
const pool = require('../database');

//Import the timestamp created by timeago.js
const time = require('../lib/timeago');
//TODO: pasar esto a el /profile console.log(time.timeago(created_at));
/* Receive the form in POST and insert the data in the DB. After that it redirects to /profile */
router.post(
	'/signup',
	passport.authenticate('local.signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		successFlash: true,
		failureFlash: true,
	}),
);

router.post('/login', (req, res, next) => {
	passport.authenticate('local.login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		successFlash: true,
		failureFlash: true,
	})(req, res, next);
});

/* Retrieve the data from the DB when the user is logged in. It shows that data */
router.get('/profile', async (req, res) => {
	try {
		// fetch('/signin', {
		// 	method: this.post,
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 		user: {
		// 			email: 'emailInput',
		// 			password: 'passwordInput',
		// 		},
		// 	}),
		// });
		//Import the user email, fullname and the time of creation to show on /profile
		const account = require('./../lib/passport');
		res.render('profile', { title: 'User Profile', css: 'public/css/profile.css', account });
	} catch (err) {
		console.error(err);
		console.error('There has been an error loading the /profile page.');
	}
});

// router.get('/profile/delete', async (req, res) => {
//     console.log(req.params.id);
//     res.send('Deleted;');
// });

//Export router module.
module.exports = router;
