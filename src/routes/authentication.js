const express = require('express');
const router = express.Router();
const passport = require('passport');
//Import the connection created in database.js
const pool = require('../database');

//Import the timestamp created by timeago.js
const time = require('../lib/timeago');

/* Receive the form in POST and insert the data in the DB. After that it redirects to /profile */
router.post(
	'/signup',
	passport.authenticate('local.signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true,
	}),
);

router.post('/login', (req, res, next) => {
	passport.authenticate('local.login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
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
		res.render(
			'profile',
			//     , {
			// 	email: email,
			// 	fullname: fullname,
			// 	password: password,
			// 	created_at: created_at,
			// }
		);
	} catch (err) {
		console.error(`There has been an error trying to select the user from the database.\nOR \nThere has been an error trying to render /profile page.\nThis is the error code: \n${err}`);
	}
});

// router.get('/profile/delete', async (req, res) => {
//     console.log(req.params.id);
//     res.send('Deleted;');
// });

//Export router module.
module.exports = router;
